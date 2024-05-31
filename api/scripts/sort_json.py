import json, re


def fix_json(jsonStr):
  # Remove all empty spaces to make things easier bellow
  jsonStr = jsonStr.replace('" :','":').replace(': "',':"').replace('"\n','"').replace('" ,','",').replace(', "',',"')
  # First remove the " from where it is supposed to be.
  jsonStr = re.sub(r'\\"', '"', jsonStr)
  jsonStr = re.sub(r'{"', '{`', jsonStr)
  jsonStr = re.sub(r'"}', '`}', jsonStr)
  jsonStr = re.sub(r'":"', '`:`', jsonStr)
  jsonStr = re.sub(r'":\[', '`:[', jsonStr)
  jsonStr = re.sub(r'":\{', '`:{', jsonStr)
  jsonStr = re.sub(r'":([0-9]+)', '`:\\1', jsonStr)
  jsonStr = re.sub(r'":([null|true|false])', '`:\\1', jsonStr)
  jsonStr = re.sub(r'","', '`,`', jsonStr)
  jsonStr = re.sub(r'",\[', '`,[', jsonStr)
  jsonStr = re.sub(r'",\{', '`,{', jsonStr)
  jsonStr = re.sub(r',"', ',`', jsonStr)
  jsonStr = re.sub(r'\["', '[`', jsonStr)
  jsonStr = re.sub(r'"\]', '`]', jsonStr)
  # Backslash all double quotes (")
  jsonStr = re.sub(r'"','\\"', jsonStr)
  # Put back all the " where it is supposed to be.
  jsonStr = re.sub(r'\`','\"', jsonStr)
  jsonStr.replace(':null,', ':None,')
  jsonStr.replace(':null', ':None')
  jsonStr.replace("’", "'")
  jsonStr.replace("’", "'")
  jsonStr = "".join(jsonStr.splitlines()) # Fix \r\n issue
  return jsonStr

headlines = '''{"articles":[{"source":{"id":null,"name":"Hindustan Times"},"author":"HT News Desk","title":"Lok Sabha Election: PM Modi holds roadshow with Chandrababu Naidu, Pawan Kalyan - Hindustan Times","description":"Lok Sabha Election 2024 LIVE: Check out the latest news updates from the ongoing general elections in India here.","url":"https://www.hindustantimes.com/india-news/lok-sabha-election-2024-live-updates-india-general-election-bjp-congress-date-result-latest-news-today-may-8-101715128648949.html","urlToImage":"https://www.hindustantimes.com/ht-img/img/2024/05/08/550x309/Modi_1715179336512_1715179336862.jpg","publishedAt":"2024-05-08T14:38:17Z","content":"Lok Sabha Election 2024 LIVE: A voter turnout of 64.4 percent was recorded across 11 states and union territories in Phase 3 of the ongoing Lok Sabha elections in the country, with northeastern state… [+22173 chars]"},{"source":{"id":null,"name":"NDTV News"},"author":null,"title":"Weight Loss Tips: These Hacks Will Make Losing Weight Easier - NDTV","description":"Finding a balanced approach to your diet and workout is key to achieving and maintaining a healthy weight.","url":"https://www.ndtv.com/health/weight-loss-tips-these-hacks-make-losing-weight-easier-5618728","urlToImage":"https://c.ndtvimg.com/2024-04/d0fo1vo8_weight-loss_625x300_11_April_24.jpg","publishedAt":"2024-05-08T13:54:43Z","content":"Be mindful of portion sizes to avoid consuming more calories than your body needs\r\nDiet and your daily habits play a significant role in weight loss. While physical activity is important for overall … [+3350 chars]"},{"source":{"id":null,"name":"Onmanorama.com"},"author":"Onmanorama Staff","title":"Filmmaker Sangeeth Sivan passes away - Onmanorama","description":"His popular movies are 'Yodha', 'Gandharvam' and 'Nirnayam'.","url":"https://www.onmanorama.com/entertainment/entertainment-news/2024/05/08/yodha-director-sangeeth-sivan-passes-away.html","urlToImage":"https://img.onmanorama.com/content/dam/mm/en/entertainment/entertainment-news/images/2024/5/8/sangeeth-sivan-c.jpg","publishedAt":"2024-05-08T13:52:30Z","content":"Mumbai: Director-cinematographer Sangeeth Sivan (65), known best for his contributions in Malayalam and Hindi cinema, passed away here on Wednesday. According to reports, he breathed his last after a… [+3981 chars]"}],"max_pages":20,"created_time":"2024-05-09T15:30:01.627000"}
'''

headlines = json.loads(fix_json(headlines))
headlines = headlines['articles']
headlines.sort(key=lambda x: x['title'])
headlines = {
  'articles':headlines,
  'max_pages': '1',
  'created_time': '2024-05-09T15:30:01.627000'
}
print(headlines)
'''
This module contains unit tests for the logger_config.py module.
'''

import pytest
import requests
import time

def test_with_fixture(example_fixture):
    assert example_fixture == 1

@pytest.mark.slow()
def test_with_slow_marker(disable_network_calls):
    time.sleep(3)
    assert True

@pytest.mark.usefixtures('disable_network_calls')
def test_to_demo_network_call_failure():
    return
    requests.get('http://www.google.com') # will raise a RuntimeError


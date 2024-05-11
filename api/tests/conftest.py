'''
This module contains general fixtures i.e. common test data
that can be used by several test cases.

pytest looks for a conftest.py module in each directory. 
These fixtures are available throughout the test directory and it's
subdirectories without having to import it. 
This is a great place to put your most widely used fixtures.
'''

import pytest, requests

@pytest.fixture
def example_fixture():
    return 1

@pytest.fixture(autouse=True)
def disable_network_calls(monkeypatch):
    '''
    Ensures that network calls are disabled in every test across the suite.

    This function raises a RuntimeError with the message "Network access not 
    allowed during testing!" when called. 
    Any test that executes code calling requests.get() will raise a RuntimeError
    indicating that an unexpected network call would have occurred.
    '''
    def stunted_get():
        raise RuntimeError("Network access not allowed during testing!")
    monkeypatch.setattr(requests, "get", lambda *args, **kwargs: stunted_get())
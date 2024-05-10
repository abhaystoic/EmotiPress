# test_with_pytest.py

import pytest

@pytest.fixture
def example_fixture():
    return 1

def test_with_fixture(example_fixture):
    assert example_fixture == 1

def test_always_passes():
    assert True

def test_always_fails():
    assert False
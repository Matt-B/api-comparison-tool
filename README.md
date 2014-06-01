This is a quick script I wrote to help me when testing. Often a requirement of a change being made is that the response being returned does *not* change. This script takes two URLs, makes a request to each one and diffs the responses, printing the results in colour to the terminal.

Usage:

    npm install
    node compare-responses.js "http://www.google.com/" "http://www.google.com/"

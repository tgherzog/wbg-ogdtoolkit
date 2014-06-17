#!/usr/bin/env python

import os
import re

def convert_links(link):
    '''
    Convert an internal wiki link to md link
    Pattern: [[(name|)link]]
      - name is optional
    '''
    # link_pattern = '(\[\[(?P<int_link>[^\|\[\]]+)(?P<int_name>[^]]*)\]\]|\[(?P<ext_link>[^\[\]\s]+)(?P<ext_name>[^]]*)\])'
    link_pattern = '\[\[(?P<name>[^\[\]]*[\|]+|)(?P<link>[^\[\]]+)\]\]'

    substituted = ""
    content_cursor = 0
    for match in re.finditer(link_pattern, content):
        # Include text from last cursor position to match.start
        substituted += content[content_cursor:match.start()]

        matches = match.groupdict()
        link = matches.get('link')
        name = matches.get('name').replace('|','').strip() or link.strip().replace(' ', '-')

        # substitute link
        substituted += '[%s](/%s)' % (name, link)

        # Track position
        content_cursor = match.end()

    # Finally append the remaining (non-matched) content
    substituted += content[content_cursor:]
    return substituted



# Loop through all the md files
for wiki_file in os.listdir('source'):
    if os.path.isfile(os.path.join('source', wiki_file)) and wiki_file.endswith('.md'):
        try:
            with open(os.path.join('source', wiki_file)) as f:
                content = f.read()

            new_content = convert_links(content)

            with open(os.path.join('source', wiki_file), 'w') as f:
                f.write(new_content)

        except Exception as e:
            print e
            print 'skipping wiki_file: %s' % wiki_file


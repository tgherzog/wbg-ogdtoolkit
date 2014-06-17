#!/usr/bin/env python

import os
import re
import yaml

def convert_links(content):
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
        link = matches.get('link').replace(' ', '-')
        name = matches.get('name').replace('|','').strip() or matches.get('link').strip()

        # substitute link
        substituted += '[%s](/%s)' % (name, link)

        # Track position
        content_cursor = match.end()

    # Finally append the remaining (non-matched) content
    substituted += content[content_cursor:]
    return substituted

def convert_sidebar(content):
    '''
    Sidebar is converted to a pure yaml file, as an array of links
    '''
    links = []

    link_pattern = '\[\[(?P<name>[^\[\]]*[\|]+|)(?P<link>[^\[\]]+)\]\]'
    for match in re.finditer(link_pattern, content):
        matches = match.groupdict()
        link = matches.get('link').replace(' ', '-')
        name = matches.get('name').replace('|','').strip() or matches.get('link').strip()
        links.append({'name': name, 'link': link})

    return links

# Loop through all the md files
for wiki_file in os.listdir('source'):
    if os.path.isfile(os.path.join('source', wiki_file)) and wiki_file.endswith('.md'):
        # Prepare YAML header for the markdown files
        header = []
        try:
            with open(os.path.join('source', wiki_file)) as f:
                content = f.read()

            # Handle _Sidebar differently - remove original file and use .yaml file instead
            if wiki_file.startswith('_Sidebar'):
                links = convert_sidebar(content)
                # Write new sidebar file
                with open(os.path.join('source', 'sidebar.yaml', 'w')) as f:
                    f.write(yaml.safe_dump(links, explicit_start=True))
                # Remove original _Sidebar.md file
                os.unlink(os.path.join('source', wiki_file))

            else:
                new_content = convert_links(content)
                title = wiki_file.replace('.md', '').replace('-', ' ')
                header.append('title: %s' % title)
                # Prepare file for metalsmith - prepend header and use formatted content
                with open(os.path.join('source', wiki_file), 'w') as f:
                    f.write('---\n')
                    f.write('\n'.join(header) +'\n')
                    f.write('---\n')
                    f.write(new_content)

        except Exception as e:
            print e
            print 'skipping wiki_file: %s' % wiki_file


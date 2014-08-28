---
title: Technology Options
---

## Open Data Scenarios

Three different levels of complexity based on the number of datasets available and the frequency of their update frequency:

- Level 1 –less than 100 datasets with less than 10 datasets changing weekly
- Level 2 –100 to 1,000 datasets with 10-100 datasets changing weekly
- Level 3 –Over 1,000 datasets with 100+ changes weekly

## Solutions

- Based on the scenarios there are various possible technical architectures
- In some cases we have provided more than one option
- We have also given some examples of software systems that can be used. Click on each graph to view the software for each component of the arquitecture.
- Some of these software are open source and others are proprietary.

**Note**: The software systems indicated in this presentation are just examples and not in any way endorsed by the World Bank.

## Level 1: less than 100 datasets with less than 10 datasets changing weekly

- Build a conventional website using a standard web server
- Data as raw data files within web server space (or on public cloud storage)
- Metadata as micro formats on HMTL page
- Site search using existing tools like Google site search
- Manual update of data, metadata and content by central IT team
- Recommended
    - Introduce commenting feature for feedback

![Level 1](/images/ogdt-archi-1.png)

## Level 2: 100 to 1000 datasets with 10-100 datasets changing weekly

- Front end as conventional CMS-based website
- Data as raw, manually managed, data files within web server space, public cloud storage , or individual ministry websites
- Metadata in SQL database, served through dynamically generated query pages
- Automated checking of broken links –Community facilities essential
- Site search by text search on database, CMS search or Google site search (GSS)
- Maintained by central team
- Recommended
    - Consider caching to take care of load
    - Do not store metadata in the CMS itself

![Level 2](/images/ogdt-archi-2.png)

## Level 3: Over 1000 datasets with 100+ changes weekly

- Front end needs to integrate different web services (API)
- Automated management of raw data files (possibly being stored on public cloud storage) (Level 3a)
- Management of data using a combination of raw data files and data stored in an Open Data System’s database (Level 3 b)
- Metadata in optimized metadata repository
- Delegate submission/maintenance of datasets to individual Ministries with custom dialogues, automatic validation, and role-based access control
- Automated checking of broken links
- Community facilities essential, including ability to raise issue with the “owner” of each dataset (e.g contact person, web form)
- Search by structured search on metadata repository, CMS or Google site search on main site

### Level 3a

![Level 3a](/images/ogdt-archi-3a.png)

### Level 3b

![Level 3b](/images/ogdt-archi-3b.png)

## Information security best practices

- Data Governance to ensure
- Authoritative Source
- Rules of Engagement
- Sustainability
- Data Classification Public v/s Restricted to ensure
- Private/restricted data not released externally
- InfoSec Controls to ensure
- Confidentiality and integrity of data
- Denial of Service (DoS) attacks

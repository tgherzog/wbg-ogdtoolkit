
The three models below present one way of thinking about an Open Data catalog system. The intent
here is to show how various elements and services relate to each other, and how the system changes
at different scales.

Click a graphic below to view it at full size.

<div id="models-container" class="content-tabs">
<ul>
<li><a id="model1-click" href="#model1">Model 1</a></li>
<li><a id="model2-click" href="#model2">Model 2</a></li>
<li><a id="model3-click" href="#model3">Model 3</a></li>
<!--
<li><a id="model4-click" href="#model4">Model 4</a></li>
-->
</ul>

<div id="model1" markdown="1">

### Model 1: Single Platform

<a href="it1.png" target="_blank"><img src="it1.png" height="320" alt="Model 1: Single Platform"/></a>

This model demonstrates a simple IT infrastructure where the data catalog and data files are hosted within a single
server environment. The server could be managed internally by the lead agency or it could be cloud-hosted. API-driven
datasets, if any, may be managed separately according to the requirements for the underlying technology.

Blogging, user support, and feedback are essential elements of user engagement in an Open Data initiative, and can often
be provided by the same or similar infrastructure as that used by the catalog itself. Conceptually, though, they are
separate systems that are only loosely connected to the data catalog.

This model is suitable where there are a small number of datasets (less than 200) in the data catalog, datasets are
small (less than 100Mb), and a single agency plays a strong role in coordinating the data catalog and managing the IT
infrastructure.

</div>

<div id="model2" markdown="1">

### Model 2: Separate Servers

<a href="it2.png" target="_blank"><img src="it2.png" height="315" alt="Model 2: Separate Servers"/></a>

This model demonstrates how the data catalog and file server might be managed separately using either internally hosted
or cloud-hosted infrastructure. This approach is only slightly more sophisticated than <a class="model-link" href="#model1">Model 1</a>, and is more appropriate
for larger datasets and catalogs. Cloud-hosted infrastructure is often a cost effective approach, but may not
be practical in regions where bandwidth is very limited.

</div>

<div id="model3" markdown="1">

### Model 3: Federated Catalogs

<a href="it3.png" target="_blank"><img src="it3.png" height="565" alt="Model 3: Federated Catalogs"/></a>

This model demonstrates how open data catalog management may be decentralized to one or more contributing ministries. In
this approach, some data files and/or API services are managed by separate ministries, while metadata is still provided
to the central catalog to enable cross-ministry search and access. A ministry may even operate its own catalog (for
instance, geospatial data or education statistics) while still supporting the central catalog, as demonstrated by
"Ministry C."

This model is appropriate where one or more ministries have the capacity and experience to manage their own open data.
Ministries that do not have this capacity may choose to rely on the implementing agency, as illustrated in
<a class="model-link" href="#model1">Model 1</a> or <a class="model-link" href="#model2">Model 2</a>.

</div>

<!--
<div id="model4" markdown="1">

### Model 4: Workflow Integration

<a href="it4.png" target="_blank"><img src="it4.png" height="645" alt="Model 4: Workflow Integration"/></a>

This model is a simple extension of <a class="model-link" href="#model3">Model 3</a>. In this approach, some ministries may choose to manage open data assets via
separate data management systems. This is entirely possible so long as the the back-end can provide public access to (or
simple export of) open datasets in open, machine-readable formats.
</div>
-->

</div>

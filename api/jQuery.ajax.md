# jQuery.ajax

### Make an HTTP request asynchronously without refreshing the page (e.g. a postback)

---

```javascript
jQuery.ajax( settings );
```

<span class="label label-info">Version 1.0</span>

__settings__ <span class="label">Default: depends on _dataType_</span>  <span class="label label-info">Accepts: Object</span>

An object that contains key/value pairs of configuration data for this Ajax request. All settings are optional. You can set and change the global default for any option by using [`$.ajaxSetup()`](/jQuery.ajaxSetup).

<table class="table table-striped table-bordered">
	<thead>
		<tr>
			<th>Setting</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>accepts</td>
			<td>
				Modify the mapping of content types to `dataTypes`.<br/><br/>

				```javascript
				$.ajax({
					accepts: {
						json: "text/javascript, application/json",
						xml: "text/xml"
					}
				});
				```

			</td>
		</tr>
	</tbody>
</table>

---

```javascript
jQuery.ajax( url, /* optional: */ settings );
```

<span class="label label-info">Version 1.5</span>
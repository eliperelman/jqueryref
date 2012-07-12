# jQuery.ajax

## Make an HTTP request asynchronously without refreshing the page (e.g. a postback)

---

<span class="label label-info">Version 1.0</span>

```javascript
jQuery.ajax( settings );
```

#### settings

<span class="label label-inverse">Accepts: Object</span>

An object that contains key/value pairs of configuration data for this Ajax request. All settings are optional. You can set and change the global default for any option by using [`$.ajaxSetup()`](/jQuery.ajaxSetup).

##### accepts

<span class="label">Default: varies</span>

<span class="label label-inverse">Accepts: Object</span>

Modify the mapping of content types to `dataTypes`

```javascript
$.ajax({
	accepts: {
		json: "text/javascript, application/json",
		xml: "text/xml"
	}
});
```

##### async

<span class="label">Default: true</span>

<span class="label label-inverse">Accepts: Boolean</span>

<span class="label label-warning">Deprecated: 1.8</span>

The default setting of `async: true` will trigger an Ajax request to execute without blocking the JavaScript execution thread. Any proceeding JavaScript after the request has started will be executed immediately. The browser will wait for the Ajax request to complete before executing any post-request operations.

Setting a request to `async: false` will cause the request to execute synchronously, i.e. block the execution of all other JavaScript until the request is complete, possible causing the browser to "hang" until finished. Because of this blocking, using `async: false` is not recommended. As of jQuery 1.8, use of `async: false` is deprecated.

---

<span class="label label-info">Version 1.5</span>

```javascript
jQuery.ajax( url, /* optional: */ settings );
```


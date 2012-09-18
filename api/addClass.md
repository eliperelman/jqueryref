# addClass

## Add one or more CSS classes to all currently selected elements

---

The `addClass` jQuery object method will add one or more CSS classes to any elements in the jQuery collection.

---

<span class="label label-info">Version 1.0</span>

```javascript
.addClass( classes )
```

#### classes

<span class="label label-inverse">Accepts: String</span>

A string representing a CSS class, or a space-delimited string of CSS classes

<div class="fiddle" id="------------"></div>

---

<span class="label label-info">Version 1.4</span>

```javascript
.addClass( function ( index, currentClass ) )
```

#### function ( index, currentClass )

<span class="label label-inverse">Accepts: function <- Number, String</span>

A function to execute for each element in the current collection. This function will be passed an _index_ which is the numeric index of the current element in relation to the jQuery collection. The function will also be passed a space-delimited string of CSS classes of the current element. Return a space-delimited string of CSS classes to have them added to the classes of the current element.

<div class="fiddle" id="---------------"></div>

---

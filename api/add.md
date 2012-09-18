# add

## Augment the current selection with elements from a new `jQuery()` call

---

The jQuery object method `add` constructs a new jQuery object by joining given elements with an already existing jQuery object. You can pass almost anything to `add` that the jQuery function accepts, including selectors, DOM elements, and strings of markup. The new jQuery object returned from `add` can be chained upon just like other jQuery objects, with the methods acting on the new object. Since calling `add` returns a new jQuery object, it will not modify the original object. Beginning with jQuery 1.4, the jQuery collection from `add` will always be in document order rather than just being placed on the end of the current collection.

_Note: To undo the add operation, you can move back in the current jQuery stack by calling `end`, or using `not` to remove the elements from the current object._

---

<span class="label label-info">Version 1.0</span>

```javascript
.add( selector )
```

#### selector

<span class="label label-inverse">Accepts: String</span>

A string representing a CSS or custom jQuery selector.

<div class="fiddle" id="mSkJW"></div>

---

<span class="label label-info">Version 1.0</span>

```javascript
.add( elements )
```

#### elements

<span class="label label-inverse">Accepts: DOM Element(s)</span>

A DOM Element, NodeList of DOM Elements, or an array of DOM Elements.

<div class="fiddle" id="Mpe8p"></div>

---

<span class="label label-info">Version 1.0</span>

```javascript
.add( html )
```

#### html

<span class="label label-inverse">Accepts: String</span>

A string representing a new fragment of markup.

<div class="fiddle" id="x7Qux"></div>

---

<span class="label label-info">Version 1.3.2</span>

```javascript
.add( elements )
```

#### elements

<span class="label label-inverse">Accepts: jQuery object</span>

A jQuery object representing an already existing selection.

<div class="fiddle" id="VpeL4"></div>

---

<span class="label label-info">Version 1.4</span>

```javascript
.add( selector, context )
```

#### selector

<span class="label label-inverse">Accepts: String</span>

A string representing a CSS or custom jQuery selector.

#### context

The element at which `selector` should be scoped to.

<div class="fiddle" id="ZaEkZ"></div>

---


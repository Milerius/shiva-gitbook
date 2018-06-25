# Block align plugin for GitBooks

A quick way of aligning markdown blocks in a GitBook. This should work for websites and generated ebooks.

GitBook Example:

```markdown
{% left %} This **will be** aligned left. {% endleft %}

{% right %} This **will be** aligned right. {% endright %}

{% center %} This **will be** centered. {% endcenter %}
```

Result:

```html
<div class="ba-left"><p>This <strong>will be</strong> aligned left.</p></div>

<div class="ba-right"><p>This <strong>will be</strong> aligned right.</p></div>

<div class="ba-center"><p>This <strong>will be</strong> centered.</p></div>
```

<div style="text-align: left;"><p>This <strong>will be</strong> aligned left.</p></div>

<div style="text-align: right;"><p>This <strong>will be</strong> aligned right.</p></div>

<div style="text-align: center;"><p>This <strong>will be</strong> centered.</p></div>

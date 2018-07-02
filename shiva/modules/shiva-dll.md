# shiva::dll

### plugins\_registry:

**Usage**

This class will allow you to store plugin creation symbols through its template _**CreatorSignature**_ parameter.  
Through this class you will be able to retrieve the number of plugins, apply a functor on each of the symbols \(as creates the plugin for example\).

#### Diagram

![](../../.gitbook/assets/plugins_registry.png)

#### plugins\_registry api

{% tabs %}
{% tab title="Class Signature" %}
```cpp
template <typename CreatorSignature>
class plugins_registry;
```
{% endtab %}

{% tab title="Constructor" %}
```cpp
explicit plugins_registry(shiva::fs::path &&plugins_directory) noexcept;
```
{% endtab %}

{% tab title="Functions" %}
#### load\_all\_symbols

```cpp
bool load_all_symbols() noexcept;
```

#### **Return value**

* `true` if all the symbols of all the libraries have been correctly loaded
* `false` if a symbol from one of the libraries was not loaded, or if the **plugins\_directory** doesn't exist

**Notes**

   This function allows you to load symbols from the template to create the object.  
   The symbols are **loaded recursively** from the folder you specified in the object's constructor.

{% hint style="warning" %}
If one of the symbols could not be correctly loaded the **function does not stop** and proceeds to load the next plugin.  
If when browsing folders a corrupted file is spotted the function will switch to **loading the next plugin**.
{% endhint %}

**nb\_plugins**

```cpp
size_t nb_plugins() const noexcept;
```

**Return value**

* numbers of plugins

**apply\_on\_each\_symbols**

```cpp
template <typename Functor>
void apply_on_each_symbols(Functor &&functor);
```

**Template parameters**

* **Functor** Represents the functor to apply on each of the loaded symbols.

**Notes**

* This function applies the **functor** as a parameter to each of the symbols that were previously loaded by the load\_all\_symbols function.
{% endtab %}
{% endtabs %}


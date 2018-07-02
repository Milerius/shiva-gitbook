# shiva::dll

### plugins\_registry:

**Usage**

This class will allow you to store plugin creation symbols through its template _**CreatorSignature**_ parameter.  
Through this class you will be able to retrieve the number of plugins, apply a functor on each of the symbols \(as creates the plugin for example\).

#### Diagram

![](../../.gitbook/assets/plugins_registry.png)

**Class signature**

```cpp
template <typename CreatorSignature>
class plugins_registry;
```


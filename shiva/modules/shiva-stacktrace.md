# shiva::stacktrace

This module simply makes a **namespace alias** and some preprocessing mandatory to use [Boost.Stacktrace](https://github.com/boostorg/stacktrace). This module is represented by a cmake interface library that facilitates its handling through other modules.

{% code-tabs %}
{% code-tabs-item title="shiva/stacktrace/stacktrace.hpp" %}
```cpp
#ifdef __GNUC__
    #ifndef _GNU_SOURCE
        #define _GNU_SOURCE
    #endif
#endif

#ifdef _MSVC_VER
    #define BOOST_STACKTRACE_USE_WINDBG
#endif

#include <boost/stacktrace.hpp>

namespace shiva
{
    namespace bs = boost::stacktrace;
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}


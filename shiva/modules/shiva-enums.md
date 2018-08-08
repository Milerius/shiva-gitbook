# shiva::enums

## ENUM

The `ENUM` macro allows preprocessor-based generation of reflective enumerations. These enumerations can be easily converted back and forth to strings. It is also possible to iterate through the available values of such an enumeration type.

```cpp
#include <shiva/enums/enums.hpp>

ENUM(AnEnum, VALUE_A, VALUE_B);

AnEnum v(AnEnum::VALUE_A);
//v is now AnEnum::VALUE_A

v = AnEnum::VALUE_B;
//v is now AnEnum::VALUE_B

std::string str = v.toString();
//str is now "VALUE_B"

AnEnum s("VALUE_A");
//s is now AnEnum::VALUE_A

for (const auto &cur : AnEnum::values()) {
    //Do stuff
}
```


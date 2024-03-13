const ERROR = 2;
const WARN = 1;

module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    /** 空组件必须自闭合 **/
    'react/self-closing-comp': ERROR,
    /** 闭合前必须添加空格 **/
    'react/jsx-space-before-closing': ERROR,
    /** style 属性必须是对象 **/
    'react/style-prop-object': ERROR,

    /** 引号 **/
    // 必须使用单引号，也允许反引号
    'quotes': [ERROR, 'single', {
      'allowTemplateLiterals': true,
    }],
    // jsx中不包含双引号的内容必须使用双引号包裹
    'jsx-quotes': [ERROR, 'prefer-double'],

    /** 分号 **/
    // 必须使用分号
    'semi': [ERROR, 'always'],
    // 分号必须在行尾
    'semi-style': [ERROR, 'last'],

    /** 括号 **/
    // 单行代码块必须带花括号
    'curly': [ERROR, 'all'],
    // 花括号和外层代码位于同一行，花括号内单行代码块必须换行
    'brace-style': [ERROR, '1tbs', {
      'allowSingleLine': false,
    }],
    // new 关键字修饰的方法无参数时也必须使用括号调用
    'new-parens': [ERROR, 'always'],
    // 函数声明表达式调用必须包裹在括号中
    'wrap-iife': [ERROR, 'inside'],

    /** 逗号 **/
    // 多行序列中逗号必须在行尾
    'comma-style': [ERROR, 'last'],
    // 多行序列尾行必须有逗号
    'comma-dangle': [ERROR, 'always-multiline'],
    // 禁止在非序列中使用逗号运算符
    'no-sequences': ERROR,

    /** 空格 **/
    // 逗号前必须无空格，逗号后必须有空格
    'comma-spacing': [ERROR, {
      'before': false,
      'after': true,
    }],
    // 分号前必须无空格，分号后必须有空格
    'semi-spacing': [ERROR, {
      'before': false,
      'after': true,
    }],
    // 箭头函数的箭头前后必须有空格
    'arrow-spacing': [ERROR, {
      'before': true,
      'after': true,
    }],
    // 括号和内容之间必须无空格
    'space-in-parens': [ERROR, 'never'],
    // 函数调用的参数括号前必须无空格
    'func-call-spacing': [ERROR, 'never'],
    // 函数声明的参数括号前必须无空格
    'space-before-function-paren': [ERROR, 'never'],
    // 生成器函数的星号必须前后都有空格
    'generator-star-spacing': [ERROR, 'both'],
    // yield 表达式的星号必须前后都有空格
    'yield-star-spacing': [ERROR, 'both'],
    // 键值对的冒号前必须无空格，冒号后必须有空格
    'key-spacing': [ERROR, {
      'mode': 'strict',
      'beforeColon': false,
      'afterColon': true,
    }],
    // 关键字前后必须有空格
    'keyword-spacing': [ERROR, {
      'before': true,
      'after': true,
    }],
    // 运算符周围必须有空格
    'space-infix-ops': ERROR,
    // 一元单词运算符之前必须有空格，无单词的运算符必须无空格
    'space-unary-ops': [ERROR, {
      'words': true,
      'nonwords': false,
    }],
    // 注释标识和内容质检必须要有空格
    'spaced-comment': [ERROR, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','],
    }],
    // 代码块花括号内侧必须有空格
    'block-spacing': [ERROR, 'always'],
    // 模板字符串的插值内侧必须无空格
    'template-curly-spacing': [ERROR, 'never'],
    // 对象花括号内侧必须有空格
    'object-curly-spacing': [ERROR, 'always'],
    // 数组方括号内侧必须无空格
    'array-bracket-spacing': [ERROR, 'never'],
    // 代码块前必须有空格
    'space-before-blocks': [ERROR, 'always'],
    // 禁止使用不必要的连续空格
    'no-multi-spaces': ERROR,
    // 禁止行尾出现空格
    'no-trailing-spaces': ERROR,
    // 禁止在对象和属性间添加空格
    'no-whitespace-before-property': ERROR,

    /** 其他格式 **/
    // 必须使用两空格缩进， switch 语句和 case 之间必须有缩进
    'indent': [ERROR, 2, {
      'SwitchCase': 1,
      'MemberExpression': 0,
    }],
    // 所有变量名必须使用驼峰格式
    'camelcase': [ERROR, {
      'properties': 'always',
    }],
    // 对象和属性间换行，点必须和属性在同一行
    'dot-location': [ERROR, 'property'],
    // 禁止使用多行字符串（非模板字符串）
    'no-multi-str': ERROR,
    // 运算符换行必须在运算符后，三元运算在 ? 或 : 之前
    'operator-linebreak': [ERROR, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    }],
    // 非空的文件末尾必须有空行
    'eol-last': [ERROR, 'always'],
    // 代码块起始结束行必须无空行
    'padded-blocks': [ERROR, 'never'],
    // 禁止超过一行的连续空行
    'no-multiple-empty-lines': [ERROR, {
      'max': 1,
    }],
    // 禁止使用一侧无数字的浮点数写法
    'no-floating-decimal': ERROR,
    // 禁止使用不必要的块作用域
    'no-lone-blocks': ERROR,
    // 每个变量必须单独声明
    'one-var': [ERROR, 'never'],

    /** 其他规则 **/
    // getter 和 setter 必须成对
    'accessor-pairs': ERROR,
    // 必须使用同类型判断 === 或 !==
    'eqeqeq': [ERROR, 'always'],
    // 必须对异常参数进行处理
    'handle-callback-err': [ERROR, '^(e|err|error)$'],
    // new 关键字修饰的方法必须以大写字母开头
    'new-cap': [ERROR, {
      'newIsCap': true,
      'capIsNew': false,
    }],
    // 生产环境禁止使用 console 函数
    'no-console': process.env.NODE_ENV === 'production' ? ERROR : WARN,
    // 禁止使用 debugger
    'no-debugger': ERROR,
    // 使用数组构造函数时必须使用单参数
    'no-array-constructor': ERROR,
    // 禁止使用 arguments.callee arguments.caller
    'no-caller': ERROR,
    // 禁止使用 eval 方法
    'no-eval': ERROR,
    // 禁止使用隐式 eval 方法
    'no-implied-eval': ERROR,
    // 禁止扩展原生对象
    'no-extend-native': ERROR,
    // 禁止不必要的函数绑定
    'no-extra-bind': ERROR,
    // 禁止不必要的 Boolean 类型转换
    'no-extra-boolean-cast': ERROR,
    // 禁止使用 __iterator__ 属性
    'no-iterator': ERROR,
    // 禁止使用变量名作为 label 使用
    'no-label-var': ERROR,
    // 禁止在 switch 使用 label
    'no-labels': [ERROR, {
      'allowLoop': true,
      'allowSwitch': false,
    }],
    // 禁止使用 Object 构造函数
    'no-new-object': ERROR,
    // 禁止创建原始类型实例
    'no-new-wrappers': ERROR,
    // 禁止使用八进制字面量
    'no-octal': ERROR,
    // 禁止使用八进制转义字符串
    'no-octal-escape': ERROR,
    // 禁止使用 __proto__ 属性
    'no-proto': ERROR,
    // 禁止函数返回赋值表达式的结果
    'no-return-assign': [ERROR, 'always'],
    // 禁止和自身比较
    'no-self-compare': ERROR,
    // 禁止重写全局对象的属性值
    'no-shadow-restricted-names': ERROR,
    // 禁止使用稀疏的数组字面量
    'no-sparse-arrays': ERROR,
    // 禁止抛出 Error 对象以外的内容
    'no-throw-literal': ERROR,
    // 禁止使用未声明的变量
    'no-undef': ERROR,
    // 禁止将变量初始化为 undefined
    'no-undef-init': ERROR,
    // 禁止在循环条件中使用未修改的变量
    'no-unexpected-multiline': ERROR,
    // 禁止不必要的三元运算
    'no-unneeded-ternary': [ERROR, {
      'defaultAssignment': false,
    }],
    // 禁止无意义 的 call apply 调用
    'no-useless-call': ERROR,
    // 禁止使用不必要的计算属性键
    'no-useless-computed-key': ERROR,
    // 禁止使用不必要的构造函数
    'no-useless-constructor': ERROR,
    // 必须使用 isNaN 方法检查 NaN
    'use-isnan': ERROR,
    // 与 typeof 运算结果比较的值必须是合法的 typeof 运算结果
    'valid-typeof': ERROR,
    // 尤达比较规则禁止，范围比较除外
    'yoda': [ERROR, 'never', {
      'exceptRange': true,
    }],
    // 不会修改的变量必须使用 const 声明
    'prefer-const': ERROR,
  },
};

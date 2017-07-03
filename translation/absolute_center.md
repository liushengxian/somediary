【译】CSS中的绝对居中

### 前言

翻译这篇文章，是因为在之前的面试当中遇到很多的基础问题，而自己却根本答不上来。这个垂直居中的问题可以说是相当基础而重要的问题了。在网上找到了这么一篇比较全面的讲解，于是准备翻译学习一下。

### 作者序

感谢大家的发言。现在你可以在[Smashing Magazines](https://www.smashingmagazine.com/2013/08/absolute-horizontal-vertical-centering-css/) 上读到这篇文章，并且体验一些新的demo(比如调整大小)以及代码示例([不定高的现代浏览器测试](#)以及[其他技术](#))。同时我也添加了一个[比对表](#)来让你确定哪一项垂直居中技术最适合你。

### 正文

我们都已经知道在CSS中 "margin: 0 auto;"用来做水平居中。但是 "margin: auto;"却不能用来做垂直居中。。。直到现在！实际上（剧透警告！）这样的绝对居中只需要再声明一个固定高度，以及如下的样式即可：

> .Absolute-Center{
>    margin: auto;
>    position: absolute;
>    top: 0; left: 0; bottom: 0; right: 0;
> }

我并不是使用这个方法的先锋者(但我还是斗胆把它命名为绝对居中)，这可能是一个非常寻常的技术，然而，大多数的垂直居中相关的文章都没有提到它以至于在我深入挖掘某篇文章的评论区之前我都从来没见过这种用法。

在[这里](#)，Simon链接到了这个jsFiddle的[代码片段](#)来展示其他的垂直居中方法([Priit](#)也在他的评论中提到了相同的方法)。为了想要研究更深入一些，我不得不使用非常特定的搜索词才能找到这个方法的[一些其他的源头](#)。

因为之前从来没有用过这个方法，我为其做了一定的测试，然后发现这个绝对居中真TM好用。

**如果你有其他的特性或者建议想要告诉我的话，请在[CodePen](#),[Smashing Magzines](#)上评论,或者在推特上艾特[shshaw](#)私信我。**

##### 优点

- 跨浏览器(包括IE8-10)
- 不需要其他的标记，极简化样式
- 响应式地支持百分比以及最大/最小值
- 仅仅使用一个类来居中所有内容
- 无视padding的居中(不需要修改box-sizing即可实现)
- 块的重新调整大小很容易
- 适用于图像

##### 缺点

- 高度必须被指定,(参见[不定高模块](#))
- 推荐设置 overflow: auto; 来防止内容溢出(参见[溢出](#))

#### 浏览器兼容性：

Chrome, Firefox, Safari, 移动端Safari, IE8-10 

经测试，绝对居中完美支持新近版本的Chrome，Firefox，Safari，移动端Safari，Windows Phone，甚至支持到IE8-10。
（之前的文章提到不支持Windows Phone，但实际上那可能只是CodePen的一些限制的原因）

### 比对表

绝对居中并不是唯一的选择。针对垂直居中有很多种实现的方法，每种方法各有千秋。你选择哪一种方法主要取决于你要支持什么样的浏览器以及你现在的标签(译者按：即DOM结构)是怎么样的，下面这个表格可以帮助你根据自己的需求做出正确的选择。

```

技术名称 | 浏览器支持 | 自适应性 | 溢出效果 | 支持设置resize:both; | 高度可变 | 主要的缺点
------- | --------- | ------- | ------- | ------------ | --------| ---------
绝对居中| 现代浏览器&IE8+ | 是 | 滚动，可以超过容器 | 是 | 不定高的时候不能完美地做到跨浏览器 |
负边距| 所有浏览器 | 否 | 滚动 | 重新调整大小但是不会保持居中 | 不是响应式的，边距必须手动计算 |
转化函数| 现代浏览器&IE9+| 是 | 滚动，可以超过容器 | 是 | 模糊渲染 |
表格单元| 现代浏览器&IE8+| 是 | 扩展容器 | 否 | 需要额外的标签 |
内联块| 现代浏览器&IE8+以及IE7* | 是 | 扩展容器 | 否 | 需要容器，是相对比较hack的方法 |
Flexbox| 现代浏览器&IE10+ | 是 | 滚动，可以超过容器 | 是 | 需要容器，以及各种浏览器的前缀 |

```

### 解释

研究各种细则与文档之后，这是我对于绝对定位如何工作的理解：

1.在[正常的文档流](#)当中，' margin: auto; '相当于为top以及bottom设置为0；
[W3.org](#): 如果'margin-top'或者'margin-bottom'被设置为'auto'，他们实际使用的值就是0。

2.position: absolute; 打破了常规的文档流，使其他内容重新渲染，仿佛这个元素从来没有存在过一样；
[MDN](#): 绝对定位的元素会从常规流当中被去除因此不会占据任何(译：文档流当中的)空间。

3.设置'top: 0;left: 0;right: 0;bottom: 0;'则让浏览器为块设置了一个新的边界盒。这时块将占据它的父控件，可能是body元素或者某一个被定义为position: relative;的容器(译：其实只要不是static定位的父元素都可以的)，的所有空间。
[MDN](#): 对于绝对定位的元素，设置的上下左右值(top,left,right,bottom)决定了它被定位时相对于父组件边界的偏移量。

4.给块设定一个宽度或者高度会避免块占据所有的空间并且强制浏览器根据新的边界框计算'margin: auto;'的值。
[MDN](#): 绝对定位元素的边距定位于这些偏移之中。(译：这句参考了MDN的中文翻译)

5.块已经被绝对定位了，因此导致它已经脱离了正常的文档流，浏览器会根据前面设置的边界值，设置相同的margin-top与margin-bottom值来居中元素。
[W3.org](#):如果【top,bottom,height】这三个值没有被设置为auto，同时margin-top与margin-bottom被设置为了auto，这种情况下应该给两个margin设置为相等的值。

绝对居中看起来是基于标准的margin: auto;在特定情况下的一种扩展应用。因此，应该在任何标准兼容的浏览器当中都能够有效。

**太长不看**: 绝对定位的元素不在文档流当中渲染，因此 margin: auto; 在协同使用"top: 0;left: 0;bottom: 0;right: 0;"的时候能够居中元素。

### 布局

#### 在容器内布局

使用绝对居中，你可以把内容块放到一个设置为 position: relative;的容器块当中去来实现内容块居中于容器块的效果。

**文中的其他示例都将基于以下样式并会根据不同情况提供附加的类来实现不同的特性**

```css
.Center-Container {
  position: relative;
}

.Absolute-Center {
  width: 50%;
  height: 50%;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
}
```

#### 在视窗内居中

希望内容块在视窗当中居中吗？把它设置成position: fixed;然后给它设置一个很高的z-index，就像这个[页面](#)一开始的例子那样。

_- 移动端Safari浏览器：如果内容块不在position: relative;的容器块之内的话，那么它将会被相对整个文档居中而不是视窗。_

```css
.Absolute-Center.is-Fixed {
  position: fixed;
  z-index: 999;
}
```

#### 稍许偏移

如果你有固定的头部(译：希望居中的块剖除这块距离)或者需要添加其他的偏移量，只需要给你的内容块添加像"top: 70px;"这样的样式就好啦。只要声明了"margin: auto;",内容块就会在你声明top,bottom,left,right的块内垂直居中。

你也可以把你的块设置成靠左垂直居中或者靠右垂直居中。用right: 0;来把它固定到右边或者用left: 0;来固定到左边吧。

```css
.Absolute-Center.is-Right {
  left: auto; right: 20px;
  text-align: right;
}

.Absolute-Center.is-Left {
  right: auto; left: 20px;
  text-align: left;
}
```

### 响应式

可能绝对居中的最大的好处就在于它可以完美支持百分比宽高下运行。甚至对更响应式的盒来说，最大/最小宽高这些属性也能按照预期正常显示。

更进一步，给元素添加内间距；绝对居中也不会出任何问题！

```css
.Absolute-Center.is-Responsive {
  width: 60%; 
  height: 60%;
  min-width: 200px;
  max-width: 400px;
  padding: 40px;
}
```

### 溢出

高出块或者容器(视窗或者一个position:relative的容器)的内容块将会溢出并有可能将内容写到内容块或者容器的外部。甚至可能会被裁剪。不过只需要简单添加一个 overflow: auto;就可以让内容在内容块当中自由滚动了。只要内容块本身不高于容器就好了。(也许你可以通过添加max-height: 100%来保证这一点，只要你没有添加给内容块添加内边距的话)。

```css
.Absolute-Center.is-Overflow {
  overflow: auto;
}
```

### 重新调整大小

```css
.Absolute-Center.is-Resizable {
  min-width: 20%;
  max-width: 80%;
  min-height: 20%;
  max-height: 80%;
  resize: both;
  overflow: auto;
}
```

你可以使用其他类或者JavaScript来调整你的内容块的大小，而不必去考虑重新手动计算中心位置！添加resize属性甚至能够让你的内容块能够被用户自己调整大小。

绝对居中保证了无论块如何调整都始终保持在中央。设置最大最小宽高会限制块的大小来保证你想要的效果并防止它溢出容器/窗口。

如果你不适用resize: both;，你可以添加一个transition值来平滑地展示尺寸变化时的动画。在块可能会被调整的比内容还小的时候，确保你已经使用了overflow: auto;属性。

经测试，绝对居中是唯一的支持使用resize:both;属性的垂直居中技术。

**警告：**
设置你的最大宽高的时候记得考虑内容块的边距。否则它将会从它的容器当中溢出。(译：我怀疑此处padding用词不妥)
resize属性在移动浏览器或者IE8-10当中不被支持。所以如果这是你的用户的重要用户体验的话，请确认你的用户有其他方式来调整块的大小。
结合resize属性与transition属性会导致用户在尝试调整大小的时候遇到跟transition中设置时间相同的延迟。

### 图像

```html
<img src="http://placekitten.com/g/500/200" class="Absolute-Center is-Image" alt="" />
```
```css
.Absolute-Center.is-Image {
  height: auto;
}

.Absolute-Center.is-Image img { 
  width: 100%;
  height: auto;
}
```

绝对居中同样适用于图像！将以上的样式设置给一个图像，如果你想让他随容器自适应的话，设置其高度为auto就好。

注意：使用height: auto;对图像来说有用，但是却会导致常规的内容块扩展以填充整个容器。除非你使用动态高度技术。这可能是因为浏览器必须计算渲染这个图像的图像高度。所以，在所有被测试的浏览器当中，如果你生命了高度，那么最终margin: auto;都会生效。

### 不定高度的情况

```javascript
/* Modernizr Test for Variable Height Content */
Modernizr.testStyles('#modernizr { display: table; height: 50px; width: 50px; margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0; }', function(elem, rule) {
  Modernizr.addTest('absolutecentercontent', Math.round(window.innerHeight / 2 - 25) === elem.offsetTop);
});
```
```css
.absolutecentercontent .Absolute-Center.is-Variable {
  display: table;
  height: auto;
}
```

绝对居中的确需要明确声明的高度，但是这个高度可以是基于百分比并决定于最大高度的。这使它成为了响应式情况下的理想方法，只要确定你设置了合适的溢出策略就好了。

还有一个针对已声明高度的（垂直居中）方法是添加display: table;方法，这可以无视内容的长度将内容块居中。这个方法在一些浏览器当中(主要是IE以及火狐)存在一些问题，所以我在ELL Creative的伙计Kalley写了一个Modernizr测试工具来检查浏览器是否支持这种居中方法。你现在可以渐进增强(来实现这个垂直居中的需求)。

缺点：
这会打破跨浏览器的兼容性。要是Modernizr测试得出的结果没有满足你的需求的话，你可能要考虑另一种[替代方式](#)来解决这个问题了。

- 不能重新[调整大小](#)。
- 火狐/IE8: 使用display: table；让内容块排到顶部，但是它依然是水平居中的。
- IE9/IE10: 使用display: table;会将内容块排列到左上角。 
- 移动Safari: 内容块会被垂直居中，但是在使用基于百分比的宽度的时候，可能会在水平方向上轻微偏离中心。

### 其他的技术

绝对居中是一个十分棒的居中方法，但是也存在一些在具体情况下更合适的其他方法。最常用且推荐的方法有[负边距](#),[转化](#),[表格单元](#),[行内块](#)以及最现代的[弹性布局](#)。其他文章已经深度剖析过这些方法了，所以我在这里只是稍微提一下比较基础的东西。

#### 负边距

```css
.is-Negative {
        width: 300px;
        height: 200px;
        padding: 20px;
        position: absolute;
        top: 50%; left: 50%;
        margin-left: -170px; /* (width + padding)/2 */
        margin-top: -120px; /* (height + padding)/2 */
}
```

可能是最常见的技术了。如果确切的尺寸已经知晓了，那么给它设置一个等于自己宽度/高度的一半的负边距(算上内编剧，如果没有使用box-sizing: border-box;属性的话)，同时设定top: 50%; left: 50%; 就可以使一个块在容器当中居中。

注意，这是测试中发现唯一能够支持IE6-7工作的居中方法。

优势：
- 跨浏览器十分好，包括IE6-7
- 需要的代码量非常少

劣势：
- 不是响应式的。不适用于基于百分比并且不能设置内容的最大/最小值。
- 内容可能会溢出容器；
- 必须将内边距考虑在内或者使用box-sizing: border-box;属性。

#### 转换

Transforms

```css
.is-Transformed { 
  width: 50%;
  margin: auto;
  position: absolute;
  top: 50%; left: 50%;
  -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
}
```

最简单的技术之一，不但拥有与绝对居中相似的好处，而且能够支持不定高的情况。
给内容块设置一个带有所需的浏览器前缀的 transform: translate(-50%,-50%); 同时设置top: 50%; left: 50%;来使其居中。

优势：
- 内容高度可变。
- 代码量很少。

劣势：
- 在IE8下不能工作。
- 需要浏览器前缀。
- 可能会与其他transform特效相互干扰。
- 在某些情况下会导致边界或者文本的模糊渲染。在现代浏览器的渲染引擎当中不算什么大问题。尤其是你开启了transform-style: preserve-3d;的时候。

##### 深度阅读

想了解更多关于转换居中的内容，你可以在CSS-Tricks上读到Chris Coyier的文章"居中百分比宽高元素"。

#### 表格单元

```html
<div class="Center-Container is-Table">
  <div class="Table-Cell">
    <div class="Center-Block">
    <!-- CONTENT -->
    </div>
  </div>
</div>
```
```css
.Center-Container.is-Table { display: table; }
.is-Table .Table-Cell {
  display: table-cell;
  vertical-align: middle;
}
.is-Table .Center-Block {
  width: 50%;
  margin: 0 auto;
}
```

这可能是这里面最棒的技术了，仅因为这个方法下高度可以随内容自动变化而且浏览器对此方法支持很好。主要的缺点是需要额外的标签，为了实现居中效果总共需要3个元素。

优点：
- 可变高内容。
- 扩展父元素时内容会自动溢出。
- 不同浏览器下都工作地很好。

缺点：
- 需要额外的标签。

##### 深度资源

获取更多相关知识，参见Roger Johansson在456bereastreet上面的文章，"IE7以上的浏览器上用CSS实现不定高的垂直居中"。

#### 行内块

```html
<div class="Center-Container is-Inline">
  <div class="Center-Block">
    <!-- CONTENT -->
  </div>
</div>
```
```css
.Center-Container.is-Inline { 
  text-align: center;
  overflow: auto;
}

.Center-Container.is-Inline:after,
.is-Inline .Center-Block {
  display: inline-block;
  vertical-align: middle;
}

.Center-Container.is-Inline:after {
  content: '';
  height: 100%;
  margin-left: -0.25em; /* To offset spacing. May vary by font */
}

.is-Inline .Center-Block {
  max-width: 99%; /* Prevents issues with long content causes the content block to be pushed to the top */
  /* max-width: calc(100% - 0.25em) /* Only for IE9+ */ 
}
```

一个很流行的需求： 使用行内块实现居中。最基础的想法是使用display: inline-block; vertical-align: middle; 再加上一个为元素来让你的内容块居中于一个容器。此处概念在这篇CSS-Trick的文章，在不确定中实现居中，中有着详尽的解释。我的实现方法添加了一系列我在其他地方没有见到过的奇技淫巧来帮助解决一些特定问题。

//TODO not tested here.
如果内容块比容器还要宽的话，内容块的宽度必须被声明为小于容器百分百减去0.25em，就像是带有长篇段落的块一样。否则，内容块将会被挤到最顶部，这就是我们为什么要使用:after。使用:before的话会导致内容块被推下到100%!

如果你的内容块需要占据尽可能多的横向空间，你可以为大号的容器下的内容块添加max-width: 99%; 或者max-width: calc(100% - 0.25em)。这取决于你需要支持的浏览器以及父容器的宽度。

这种方式的好处与表格单元技术的好处相似，但是我总是遗弃这种方法因为这更多的像是一种旁门左道。然而，对这个技术来说浏览器支持却是非常好的。这也是一个非常流行的技术。

优点：
- 内容块的高度可变。
- 伸缩父容器的时候内容块会自动溢出。
- 跨浏览器兼容性非常好，而且可以稍作修改就能支持IE7(参见这个[CSS](#))

缺点：
- 需要一个容器
- 依赖于margin-left: -0.25em;来保证正确地水平居中，但是可能需要针对不同的字体/尺寸重新调整。
- 内容块的宽度必须被声明为不宽于容器100%减去0.25em的宽度。

#####深度阅读

要想阅读更多关于行内块居中方法，你可以在查看Chris Coyier在CSS-Tricks上的文章"[在不确定中实现居中](#)"。

#### 弹性布局

```css
.Center-Container.is-Flexbox {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
     -moz-box-align: center;
     -ms-flex-align: center;
  -webkit-align-items: center;
          align-items: center;
  -webkit-box-pack: center;
     -moz-box-pack: center;
     -ms-flex-pack: center;
  -webkit-justify-content: center;
          justify-content: center;
}
```

CSS中未来的布局。弹性布局是被设计为解决像垂直居中这样的常见布局问题的最新准则。Smashing Magazine上已经有一篇很详细的关于使用弹性布局用来居中元素的文章。记住弹性布局不只是一种居中的方法，它也可以被用来处理列或者是各种各样疯狂的布局问题。

优势：
- 内容块可以任意宽高。甚至优雅地溢出。
- 可以同时使用更先进的布局技术。

劣势：
- 不支持IE8-9
- 需要一个容器或者给body元素一些特殊样式
- 需要添加各式各样的浏览器前缀来保证在现代浏览器上的正常工作
- 可能会带来性能问题

##### 深度阅读

了解更多可以参考David Storey在Smashing Magazine上的文章"使用Flexbox来设计完成CSS布局易如反掌"。

### 结语

每项技术都各有千秋。你选择使用哪一项基本取决于你所需要支持的浏览器以及你现在的DOM结构是什么样子的。用我在上面给你的那个比对表来决定使用哪一种技术吧！

绝对居中是一种完全独立的解决方案而且毫无副作用。任何你可以用负边距方法的地方，你都可以使用绝对居中。你不需要去处理讨厌的边距数学问题或是添加其他的标签。而且你可以响应式地调整自己的布局。

如果你的站点需要最大程度的兼容不定高内容，那么可以尝试一下表格-单元法，行内块技术。如果你现在做的工作可以使用最前沿的技术，那么给弹性布局一个机会吧！他能给你带来最先进的布局体验。
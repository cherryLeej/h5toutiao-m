module.exports = {
    plugins: {

      // 配置使用postcss-pxtorem
      // 作用:把px 转换为 rem
      'postcss-pxtorem': {
        // 根元素的值，
        // 项目用的是lib-flexible适配方案，它的作用是把一行分为10份，每份就是十分之一；
        // 所以 rootValue 应该设置为你的设计稿宽度的十分之一；
        // 大部分设计图都是基于iPhone6来设计的，iPhone6设备的物理像素是750px
        // 我们设计稿的宽度是750，所以应该设置为750 / 10 =75
        // 但是vant建议设置为37.5，因为vant是基于375来写的
        // 所以必须设置为37.5，唯一的缺点就是写css时，按照设计图的尺寸除以2才可以；

        // 有没有更好的办法呢？
        //  如果是vant组件库自己的样式，就按照 37.5 来转换
        //  如果是 我们自己 的样式，就按照 75 来转换
        rootValue({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75;
        },

        // 配置要转换的 CSS 属性
        //  * 代表css的所有属性都被转换为rem
        propList: ['*'],
      },
    },
  };
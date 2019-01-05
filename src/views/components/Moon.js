export default class Moon {
  constructor (ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
  }

  draw () {
    // let ctx = this.ctx,
    //   gradient = ctx.createRadialGradient(100, 100, 60, 200, 200, 600)
    // // 月亮
    // // gradient.addColorStop(0, 'rgba(255,255,255,0.5)')
    // // gradient.addColorStop(0.01, 'rgb(70,70,80)')
    // // gradient.addColorStop(0.2, 'rgb(40,40,50)')
    // // gradient.addColorStop(0.4, 'rgb(20,20,30)')
    // gradient.addColorStop(1, '#252953')
    // ctx.save()
    // ctx.fillStyle = gradient

    // ctx.fillRect(0, 0, this.width, this.height)
    // ctx.restore()
    var context = this.ctx
    var x1 = 180 // 第一个圆圆心的X坐标
    var y1 = 0 // 第一个圆圆心的Y坐标
    var r1 = 30 // 第一个圆的半径
    var x2 = 180 // 第二个圆圆心的X坐标
    var y2 = 0 // 第二个圆圆心的Y坐标
    var r2 = 500 // 第二个圆的半径
    var radialGradient1 =
        context.createRadialGradient(x1, y1, r1, x2, y2, r2)
    radialGradient1.addColorStop(0, 'rgb(71, 30, 78)')
    radialGradient1.addColorStop(1, 'rgb(29, 36, 87)')
    context.save()
    context.fillStyle = radialGradient1
    context.fillRect(0, 0, this.width, this.height)
    context.restore()
  }
}

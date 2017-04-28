<template>
    <div>
        <div class="row">
            <div class="col-50"><a @click="increment" class="button button-big button-fill button-success">+1</a></div>
            <div class="col-50"><a @click="del" class="button button-big button-fill button-danger">-1</a></div>
        </div>
        <div class="list-block inset">
            <ul>
                <li><a href="#" class="item-link list-button ">List Button 1</a></li>
                <li><a href="#" class="item-link list-button">List Button 2</a></li>
                <li><a href="#" class="item-link list-button">List Button 3</a></li>
            </ul>
        </div>

        <div class="list-block">
            <ul>
                <li class="item-content">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">商品名称</div>
                        <div class="item-after">杜蕾斯</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">型号</div>
                        <div class="item-after">极致超薄型</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block-title">标题和副标题</div>
        <div class="list-block">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">商品名称</div>
                        <div class="item-after">杜蕾斯</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">型号</div>
                        <div class="item-after">极致超薄型</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block-title">带箭头</div>
        <div class="list-block">
            <ul>
                <li class="item-content item-link">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">商品名称</div>
                        <div class="item-after">杜蕾斯</div>
                    </div>
                </li>
                <li class="item-content item-link">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">型号</div>
                        <div class="item-after">极致超薄型</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import Vuex from 'vuex'
  export default {
    methods: Vuex.mapActions([
      'increment',
      'del'
    ]),
  }
</script>
<template>
    <div class="content">
        <div class="list-block media-list">
            <ul v-for="item in $store.state.lines">
                <li>
                    <router-link to="/lineDetail" class="item-link item-content">
                        <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
                        <div class="item-inner">
                            <div class="item-title-row">
                                <div class="item-title">{{item.name}}</div>
                                <div class="item-after">$15</div>
                            </div>
                            <div class="item-subtitle">标题</div>
                            <div class="item-text">此处是文本内容...</div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
  export default{}
</script>
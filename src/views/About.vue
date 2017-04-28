<template>
    <div>
        <header class="bar bar-nav">
            <h1 class='title'>金山户外网</h1>
        </header>
        <nav class="bar bar-tab">
            <router-link class="tab-item external" to="/" replace>
                <span class="icon icon-home"></span>
                <span class="tab-label">线路</span>
            </router-link>
            <router-link class="tab-item external" to="/user" replace>
                <span class="icon icon-me"></span>
                <span class="tab-label">用户</span>
            </router-link>
            <router-link class="tab-item external active" to="/about" replace>
                <span class="icon icon-star"></span>
                <span class="tab-label">联系我们</span>
            </router-link>
        </nav>
        <div class="list-block">
            <ul>
                <li class="item-content">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">报名热线</div>
                        <div class="item-after"><a href="tel:400-820-7521">400-820-7521</a></div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">客服qq</div>
                        <div class="item-after">3182536927</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">邮编</div>
                        <div class="item-after">200540</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">邮箱</div>
                        <div class="item-after">3182536927@qq.com</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

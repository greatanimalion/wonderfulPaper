<template>
    <div style="padding: 10px 0;text-align: center;">
        <div style="margin: 10px 3px 20px 3px;text-align: center;color: aliceblue;">缩略图</div>
        <div class="layerBOX"><img src="" class="layerThumbnail"></div>
    </div>
    <div>1313131</div>
</template>

<script setup lang="ts">



</script>

<style scoped lang="scss">
.layerEditButton {
    font-size: 20px;
    cursor: pointer;
    color: #fff;
}
.createLayer {
    position: absolute;
    z-index: 10;
    top: 329px;
    width: 30px;
    height: 30px;
    left: 152px;
}
.layerBOX{
    height: 110px;
    width: 98%;
    outline: #6b6b6b solid 1px;
    margin: auto;
    border-radius: 2px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
li {
    color: wheat;
    margin: 5px 4px;
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #4e4e4e;
    background-color: #2d2d2d;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;
    span {
        font-size: 14px;
        width: 57px;
        text-align: center;
    }

    &:hover {
        border-color: #2f9ecd;
    }

    .baseElement {
        cursor: move;
        margin: 4px 0;
        width: 70px;
        padding: 0px;
        overflow: hidden;
    }
}
button {
    width: 100%;
    font-size: 11px;
    color: #ec9f9f;
    background-color: #4e4e4e;
}

</style>
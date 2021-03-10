<template>
    <el-select
        v-model="selectVal"
        multiple
        :filterable="filterable"
        :placeholder="placeholder"
        :clearable="clearable"
        :size="size"
        :style="styles"
        ref="dargSelect"
        >
        <slot></slot>
    </el-select>
</template>

<script>
import Sortable from 'sortablejs'
export default {
    props: {
        value:{
            default:function() {
                return []
            }
        },
        filterable:{
            type:Boolean,
            default:false
        },
        clearable:{
            type:Boolean,
            default:false
        },
        placeholder:{
            type:String,
            default:'请输入'
        },
        size:{
            type:String,
            default:'medium'
        },
        styles:{
            type:String,
            default:''
        }
    },
    mounted() {
        this.init()
    },
    methods:{
        init() {
            const el = this.$refs.dargSelect.$el.querySelectorAll('.el-select__tags > span')[0]
            //设置配置
            const ops = {
                //动画效果
                animation: 500,
                ghostClass: "sortable-ghost",
                //拖动结束
                onEnd:  (evt) => {
                    console.log(evt)
                    const targetRow = this.value.splice(evt.oldIndex,1)[0]
                    this.value.splice(evt.newIndex,0,targetRow)
                    console.log(this.value)
                },
            };
            //初始化
            const sortable = Sortable.create(el, ops);
        }
    },
    computed: {
        selectVal:{
            get(val) {              
                return typeof this.value === 'object'? this.value : []
            },
            set(val) {
                this.$emit('update:value',[...val])
            }
        }
    },
    watch: {
        value:{
            handler(newVal) {
                console.log('value'+newVal)
            },
            immediate:true,
            deep:true
        }
    }
}
</script>

<style scoped="scoped">
/deep/ .el-select__tags .sortable-ghost{
    background: #1890ff !important;
}
</style>
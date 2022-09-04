<template>
<div>
    <el-input :rows="5" type="textarea" maxlength="140" v-model="item.content" @input="()=>{inputReflash('voiceRecord' + index)}" placeholder="140字最多" resize="none">
    </el-input>
    <VoiceRecord :ref="'voiceRecord' + index" :getVoice="recordVoice(item)" :voicedown="[]" />
</div>
</template>

<script>
import VoiceRecord from "../../VoiceRecord/VoiceRecord.vue";
export default {
    components: {
        VoiceRecord
    },
    props: {
        'item': Object

    },
    methods: {
        inputReflash(voiceRecordRef) {
            this.$refs[voiceRecordRef][0].clearAll();
            this.$forceUpdate();
        },
        recordVoice(item) {
            return data => {
                item.content = data;
            };
        },
    }
}
</script>

<template>
    <div class="flex flex-row gap-x-8">
        <!-- Hyperparameters -->
	    <FloatLabel>
		    <Select class="w-36" input-id="n_estimators" :options="[50, 100, 200]" :default-value="100" />
		    <label for="n_estimators">Number of estimators</label>
	    </FloatLabel>
			
	    <FloatLabel>
		    <Select class="w-36" input-id="learning_rate" :options="[0.01, 0.1, 0.2]" :default-value="0.1" />
		    <label for="learning_rate">Learning rate</label>
	    </FloatLabel>

	    <FloatLabel>
		    <Select class="w-36" input-id="max_depth" :options="[3, 4, 5]" :default-value="3" />
		    <label for="max_depth">Max depth</label>
	    </FloatLabel>

        <FloatLabel>
		    <Select class="w-36" input-id="subsample" :options="[0.8, 1.0]" :default-value="1.0" />
		    <label for="subsample">Subsample</label>
	    </FloatLabel>

        <FloatLabel>
		    <Select class="w-36" input-id="min_sample_split" :options="[2, 5, 10]" :default-value="5" />
		    <label for="min_sample_split">Min samples split</label>
	    </FloatLabel>
    </div>
</template>

<script setup lang="ts">
import { FloatLabel, Select } from 'primevue'

</script>
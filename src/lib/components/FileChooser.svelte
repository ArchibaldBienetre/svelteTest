<!-- mostly copied + adjusted from example here: https://svelte.dev/tutorial/select-bindings -->
<script>
	import { fade, fly } from "svelte/transition";

	// ############## images ##############

	const image1Text = `Welsh Corgy`;
	const image2Text = `Beagle`;
	const image3Text = `Bernese Mountain Dog`;
	const toolTipTextSuffix = ` - isn't it a cute one?`;

	import image1 from "../../assets/dogImage1.jpg";
	import image2 from "../../assets/dogImage2.jpg";
	import image3 from "../../assets/dogImage3.jpg";

	const imageOptions = [
		{ id: "image1", text: image1Text },
		{ id: "image2", text: image2Text },
		{ id: "image3", text: image3Text },
	];

	const chosenImageIdToImageData = {
		image1: {
			image: image1,
			text: image1Text,
		},
		image2: {
			image: image2,
			text: image2Text,
		},
		image3: {
			image: image3,
			text: image3Text,
		},
	};

	let selectedImage;
	let imageToDisplay = image1;
	let imageToDisplayAltText = image1Text;
	let imageToDisplayToolTip = image1Text + toolTipTextSuffix;

	// ############## transitions ##############

	const transitionOptions = [
		{ id: "fade", text: "fade" },
		{ id: "fly", text: "fly" },
	];

	let selectedTransition;

	function handleSubmit() {
		console.debug(`Selected image with ID '${selectedImage}'`);
		let imageData = chosenImageIdToImageData[selectedImage];
		imageToDisplay = imageData.image;
		imageToDisplayAltText = imageData.text;
		imageToDisplayToolTip = imageData.text + toolTipTextSuffix;
		console.debug(
			`The selected option is ${imageToDisplay ? "truthy" : "falsy"}`
		);
	}
</script>

<h2>Choose a image and between-image transition</h2>

<form on:submit|preventDefault={handleSubmit}>
	<select
		id="imageSelect"
		aria-label="select images"
		bind:value={selectedImage}
	>
		{#each imageOptions as imageOption}
			<option value={imageOption.id}>{imageOption.text}</option>
		{/each}
	</select>
	<select
		id="transitionSelect"
		aria-label="select transition between images"
		bind:value={selectedTransition}
	>
		{#each transitionOptions as transitionOption}
			<option value={transitionOption.id}>{transitionOption.text}</option>
		{/each}
	</select>

	<button id="sumbitSelection" type="submit">Submit</button>
</form>

{#key imageToDisplay}
	{#if selectedTransition === "fade"}
		<img
			in:fade
			id="imageDisplay"
			alt={imageToDisplayAltText}
			title={imageToDisplayToolTip}
			src={imageToDisplay}
		/>
	{/if}
	{#if selectedTransition === "fly"}
		<img
			in:fly={{ y: 200, duration: 1000 }}
			id="imageDisplay"
			alt={imageToDisplayAltText}
			title={imageToDisplayToolTip}
			src={imageToDisplay}
		/>
	{/if}
{/key}

<style>
	img {
		height: 500px;
	}
</style>

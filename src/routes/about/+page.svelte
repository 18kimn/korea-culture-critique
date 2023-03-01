<script lang="ts">
	import Mugunghwa from '$lib/Mugunghwa.svelte';

	export let data: any;
</script>

<div class="page">
	<div class="content">
		<div class="site">
			<h2>about this site</h2>
			<p>
				<em>Korea, Culture, Critique</em> is a home for critical
				reflection on contemporary Korea. Our blog takes the
				highly visible artifacts of the <em>Hallyu Wave</em> as
				entry points into an exploration of the curents taht
				birthed them, from the founding of South Korea through
				Korea's unilateral division through today's crises of
				technology and capital that continue to shape the media
				many of us enjoy. We jam out to Aespa and ask what kind
				of values their AI characters propagate; we marvel at
				BTS' international success and gauge its significance for
				the future of Korea; we laugh at <em>Single's Infero</em>
				and think about the types of bodies Korean popular culture
				prizes above others.
			</p>
			<p>
				We take a critical approach. This doesn't mean we center
				criticism, but instead comes from a refusal to take
				elements and messages from media as they are. All media
				is created along a particular set of axes that privilege
				some and marginalize others. Regardless of whether a
				showrunner or idol intend to or not, they promote
				specific sets of values that can be found through careful
				and close reading. If we want to move towards a better
				world, with values that are more democratic, humane, and
				liberatory, then there is a need to pull back the curtain
				on these hidden values and refuse to take them for
				granted. That insistence and recognition and refusal are
				what we call critique.
			</p>
			<p>
				We hope you'll join us in thinking slowly about the state
				of Korean culture today. The website is currently in a
				6-month trial phase as we figure things out. After this
				period, we'll recalibrate, and the site may change
				direction -- we may open the site for submissions or
				close the site completely.
			</p>
			<p>
				With love, <br />
				Nathan and Isabelle
			</p>
		</div>
		<div class="authors">
			<h2>about the authors</h2>
			<div class="author">
				<em class="name" id="nathan-kim">Nathan Kim</em>
				cares a lot about the state of this world and the people in
				it.
				<p>
					He is an incoming PhD student in the School of
					Information at the University of Michigan, where he
					will work with Matt Bui and Libby Hemphill on topics
					related to racial justice and digital geography. In
					undergrad, he double majored in Statistics & Data
					Science and Ethnicity, Race, & Migration. He is an
					active developer in the Anti-Eviction Mapping Project
					and performs data analysis for the Distributed AI
					Research Institute.
				</p>
				<p>
					In his free time, he enjoys playing single-player video
					games, including <em>Persona 5 Royal</em>,
					<em>The Legend of Zelda: Breath of the Wild</em>, and
					<em>Hades</em>.
				</p>
			</div>
			<div class="author">
				<em class="name" id="isabelle-rhee">Isabelle Rhee</em> is
				a recent graduate from Yale University, where she also majored
				in Ethnicity, Race, & Migration. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt
				ut labore et dolore magna aliqua. Vestibulum lorem sed risus
				ultricies. In aliquam sem fringilla ut morbi tincidunt augue.
				Cum sociis natoque penatibus et magnis dis. Morbi enim nunc
				faucibus a pellentesque sit amet porttitor. Blandit turpis
				cursus in hac. Condimentum mattis pellentesque id nibh tortor.
				Sed enim ut sem viverra. Sapien pellentesque habitant morbi
				tristique senectus et netus et malesuada. Elit scelerisque
				mauris pellentesque pulvinar pellentesque habitant morbi tristique
				senectus. Sagittis aliquam malesuada bibendum arcu vitae elementum
				curabitur. Urna et pharetra pharetra massa massa ultricies
				mi quis hendrerit.
			</div>
		</div>
		<div class="see-also">
			If you liked the content on this site, you might also want
			to follow any of the following:
			<ul>
				<li>Nodutdol</li>
				<li>that one site on BTS research</li>
				<li><em>positions: east asia critique</em></li>
			</ul>
		</div>
	</div>
	<div class="mgh">
		<Mugunghwa paths={data.paths} />
	</div>
</div>

<style>
	.page {
		width: 100%;
		display: flex;
		flex-direction: row;
		padding: 2rem;
	}

	.content {
		max-width: 70ch;
	}

	.site,
	.authors,
	.author,
	.see-also {
		margin: 2rem 0;
	}
</style>

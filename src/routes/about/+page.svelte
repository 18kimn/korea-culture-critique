<script lang="ts">
	import Mugunghwa from '$lib/Mugunghwa.svelte';
	import mgh from './mgh.svg?raw';
	$: console.log(mgh);
</script>

<div class="page-container">
	<div class="page">
		<h2>about this site</h2>
		<div class="content">
			<div class="row reverse">
				<div class="site">
					<p>
						<em>Korea, Culture, Critique</em> is a home for
						critical reflection on contemporary Korea. Our blog
						takes the highly visible artifacts of the
						<em>Hallyu Wave</em>
						as entry points into an exploration of the curents that
						birthed them, from the founding of South Korea by way
						of Korea's unilateral division to today's crises of technology
						and capital that continue to shape the media many of us
						enjoy. We jam out to Aespa and ask what kind of values
						their AI characters propagate; we marvel at BTS' international
						success and gauge its significance for the future of Korea;
						we laugh at
						<em>Single's Inferno</em>
						and think about the types of bodies Korean popular culture
						prizes above others.
					</p>
					<p>
						We take a critical approach. This doesn't mean we
						center criticism, but instead comes from a refusal to
						take elements and messages from media as they are.
						All media is created along a particular set of axes
						that privilege some and marginalize others.
						Regardless of whether showrunners or idols intend to
						or not, they promote specific sets of values that can
						be found through careful and close reading. If we
						want to move towards a better world, with values that
						are more democratic, humane, and liberatory, then
						there is a need to pull back the curtain on these
						hidden values and refuse to take them for granted.
						That insistence, and recognition, and refusal, are
						what we call critique.
					</p>
					<p>
						The nature of this goal is intentionally expansive,
						or even impossible in some senses of the word. This
						blog is just one method to begin that practice, a
						cross-section of issues we consider important and
						close to our hearts, and we hope you'll join us in
						thinking slowly about the state of Korean culture
						today beyond this website. The website is currently
						in a 6-month trial phase as we figure things out.
						After this period, we'll recalibrate, and the site
						may change direction -- we may open the site for
						submissions or close the site completely.
					</p>
					<p>
						With love, <br />
						Nathan and Ji-hye
					</p>
				</div>
				<div class="container">
					<Mugunghwa paths={mgh.split('\n')} />
				</div>
			</div>
			<h2>about the authors</h2>
			<div class="row">
				<div>spacer</div>
				<div>
					<div class="author">
						<em class="name" id="nathan-kim">Nathan Kim</em>
						cares a lot about the state of this world and the people
						in it.
						<p>
							He is an incoming PhD student in the School of
							Information at the University of Michigan, where he
							will work with Matt Bui and Libby Hemphill on
							topics related to racial justice and digital
							geography. He is especially interested in a
							critical study of digital infrastructure -- those
							apparatuses around which contemporary society
							organizes itself, which function precisely by being
							taken for granted.
						</p>
						<p>
							In undergrad, he double majored in Statistics &
							Data Science and Ethnicity, Race, & Migration. He
							is an active developer in the Anti-Eviction Mapping
							Project, where he is currently acting as a
							coordinator for the <a
								href="https://evictorbook.com"
								><em>Evictorbook</em></a
							>
							project. <em>Evictorbook</em> aims to deobfuscate entangled
							networks of property ownership in the San Francisco
							Bay Area. He also performs data analysis for the Distributed
							AI Research (DAIR) Institute with Dr. Alex Hanna, Director
							of Research. At DAIR, he studies the diffusion of and
							responses to student protest movements in the United
							States.
						</p>
						<p>
							In his free time, he enjoys playing single-player
							video games, including <em>Persona 5 Royal</em>,
							<em>The Legend of Zelda: Breath of the Wild</em>,
							and
							<em>Hades</em>. He's happiest with his girlfriend,
							Anne, or when dreaming of a cat that he will get as
							soon as he moves to his new apartment --
							<em>very soon</em>.
						</p>
					</div>
				</div>
			</div>
			<div class="row reverse">
				<div class="author">
					<em class="name" id="isabelle-rhee"
						>Ji-hye (Isabelle) Rhee</em
					>
					is a second-generation Korean American who hails from Honolulu,
					Hawaiʻi by way of Seoul, Boston, the midwest, and New Haven.
					Ji-hye has an ethnic studies and human rights background
					and interests in carceral studies, imperialisms in the Pacific,
					and legal history. Their previous academic and creative
					projects have centered on the history of colonialism and
					incarceration in Hawaii, mobile home organizing and
					<a
						href="https://voiceofoc.org/2022/01/rhee-santa-anas-mobile-home-communities-deserve-rent-control/"
						target="_blank"
						rel="noreferrer">housing justice</a
					>
					in California, and
					<a
						href="https://aaww.org/%ed%95%b4%eb%b0%a9-liberation/"
						target="_blank"
						rel="noreferrer">Korean diasporic identity.</a
					>

					Ji-hye’s skills and interests range from impact
					journalism to
					<a
						href="https://www.jooksongs.com/members"
						target="_blank"
						rel="noreferrer">spoken word poetry</a
					>
					to (amateur) music commentary. They are an avid BTS fan
					and have written about
					<a
						href="https://ther3journal.com/issue-3/counting-grey-rhinos/"
						target="_blank"
						rel="noreferrer">BTS’s music,</a
					>
					racial melancholy, and mental health. As of now, Ji-hye
					is actively job hunting with the hopes of starting a career
					in client–centered public interest work.
					<ul>
						<li>
							Currently reading: <em
								>I want to Die But I want to Eat Tteokbokki: A
								Memoir by Baek Sehee.</em
							>
						</li>
						<li>
							Currently listening: <em>"People Pt.2"</em> by Agust
							D (feat. IU)
						</li>
						<li>Current obsession: playing the ukulele</li>
					</ul>
					<p>
						You can read more of Ji-hye's writing <a
							href="https://linktr.ee/jihyerhee"
							target="_blank"
							rel="noreferrer">here.</a
						>
					</p>
				</div>
				<div>spacer</div>
			</div>
			<div class="row">
				<div>spacer</div>
				<div class="see-also">
					If you liked the content on this site, you might also
					want to follow any of the following:
					<ul>
						<li>Nodutdol</li>
						<li>that one site on BTS research</li>
						<li><em>positions: east asia critique</em></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page-container {
		display: flex;
		justify-content: center;
	}

	.page {
		width: 100%;
		max-width: 1400px;
		padding: 2rem;
	}

	.row {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 2rem;
		justify-content: space-between;
	}

	.reverse {
		flex-wrap: wrap-reverse;
	}

	h2 {
		font-size: 3.5rem;
	}

	.row div {
		flex: 1 1 min(50ch, 100%);
		max-width: 70ch;
	}

	.container {
		display: flex;
		justify-items: center;
	}

	.site,
	.author,
	.see-also {
		margin: 2rem 0;
	}
</style>

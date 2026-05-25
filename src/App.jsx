import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`

const links = {
  home: import.meta.env.BASE_URL,
  email: 'mailto:yeojosh092@gmail.com',
  linkedin: 'https://www.linkedin.com/in/josh-h-yeo/',
  resume: assetPath('resume.pdf'),
  itch: 'https://j-yeo.itch.io',
  featuredTechnicalReel: 'https://vimeo.com/1192391079',
  featuredTechnicalReelEmbed: 'https://player.vimeo.com/video/1192391079',
  unityTechnicalReel: 'https://vimeo.com/1192391079',
  unityTechnicalReelEmbed: 'https://player.vimeo.com/video/1192391079',
  unrealTechnicalReel: 'https://vimeo.com/1188123456',
  unrealTechnicalReelEmbed: 'https://player.vimeo.com/video/1188123456',
  unityCaseStudy: '#/dust-bunny',
  dustBunnyItch: 'https://stoopidchzcat.itch.io/dust-bunny',
}

const emailAddress = 'yeojosh092@gmail.com'

const reels = [
  {
    title: 'Unreal Engine / Wwise Technical Audio Study',
    label: 'UE5/Wwise Technical Audio Reel',
    description:
      'Gameplay audio systems implemented in Unreal and Wwise, including C++/Blueprint scripting, states, RTPC behavior, spatial playback, and mix changes.',
    tags: ['Unreal Engine', 'Wwise', 'C++', 'Blueprints', 'RTPCs'],
    href: links.featuredTechnicalReel,
    embed: links.featuredTechnicalReelEmbed,
    embedTitle: 'Joshua Yeo Technical Audio Reel',
    cta: 'Watch Reel',
  },
  {
    title: 'Dust Bunny',
    label: 'Unity/Wwise Technical Audio Reel',
    description:
      'Technical audio systems from Dust Bunny, a 3D narrative-platformer about a sentient bunny-shaped dust clump moving through a messy bedroom, including adaptive music, physics-driven RTPCs, spatial ambience, gameplay-responsive SFX, and mix-state behavior.',
    tags: ['Unity', 'Wwise', 'C#', 'RTPCs', 'Adaptive Music', 'Spatial Audio'],
    href: links.unityTechnicalReel,
    embed: links.unityTechnicalReelEmbed,
    embedTitle: 'Joshua Yeo - Unity/Wwise Technical Sound Design Reel',
    cta: 'Watch Reel',
  },
]

const dustBunnyTeaser = {
  title: 'Dust Bunny',
  label: 'Unity/Wwise Technical Audio Reel and Case Study',
  description:
    'Technical audio systems from Dust Bunny, a 3D narrative-platformer about a sentient bunny-shaped dust clump moving through a messy bedroom, including adaptive music, physics-driven RTPCs, spatial ambience, gameplay-responsive SFX, and mix-state behavior.',
  tags: ['Unity', 'Wwise', 'C#', 'Adaptive Music', 'RTPCs', 'Spatial Audio'],
  href: links.unityCaseStudy,
  cta: 'Read Case Study',
}

const featuredReel = reels[1]
const unityReel = reels[1]
const unrealReel = reels[0]

const projectMeta = [
  ['Role', 'Sound Designer / Audio Lead / Project Manager'],
  ['Tools', 'Unity, Wwise, C#'],
  ['Team', '11-person student team'],
  ['Timeline', '12-week production period'],
]

const caseFocus = [
  'Adaptive music',
  'RTPC systems',
  'Physics audio',
  'Spatial ambience',
  'UI and mix clarity',
  'Audio direction',
]

const musicStates = [
  ['mus_state', 'High-level Wwise State Group controlling the main music progression.'],
  ['mus_game', 'Main Music Switch Container for the game score.'],
  ['mus_zone1', 'Opening zone progression under the bed.'],
  ['mus_zone2', 'Nightstand and desk progression, including darker string material.'],
  ['mus_glide', 'Final gliding cue triggered after an intentional period of silence.'],
]

const musicProgression = [
  {
    title: 'Zone 1: under the bed',
    body:
      'The first dust pickup introduces a celesta motif, then moves into an 8-bar piano loop. Later trigger points complete the motif, fade the music out for ambience, add harmonic celesta layers around the first Memory Object, and hold a fuller piano/celesta state after the door puzzle is completed.',
  },
  {
    title: 'Zone 2: nightstand and desk',
    body:
      'A collision trigger moves the high-level music state into Zone 2. After the vent airwave, low strings and pizzicato bass create a more exposed texture. Memory Object panel scripts bring back the melodic motif, desk progression adds piano and celesta patterns, and the diary panel state gradually fades the music away.',
  },
  {
    title: 'Roomba chase: distance-based RTPC',
    body:
      'During the Roomba chase, the Wwise Game Parameter roomba_to_bunny tracks distance between the robot vacuum and the player. RTPC curves increase music playback speed and volume as the gap closes, so danger rises along a gradient instead of flipping to a separate chase track.',
  },
  {
    title: 'Gliding',
    body:
      'The score stays silent until the player reaches the end of the bookshelf and is prompted to glide toward the open moving box. A Unity collision trigger sets mus_state to mus_glide, giving the final movement prompt a more distinct emotional entry.',
  },
]

const responsiveAudio = [
  {
    title: 'bunny_size',
    body:
      'Tracks the player character as the dust bunny grows. Movement and interaction sounds can become heavier or more substantial as the character gains scale, making growth audible as well as visual.',
  },
  {
    title: 'bunny_velocity',
    body:
      'Tracks movement speed so audio can respond differently to gentle movement, faster rolling, and more forceful player motion.',
  },
  {
    title: 'Physics-based object audio',
    body:
      'Interactable objects use physics-based audio scripts so bumps, movement, and collisions can respond to movement, collision force, mass, or velocity instead of behaving as fixed one-shot sounds.',
  },
]

const ambienceDetails = [
  {
    title: 'Randomized intermittent ambience',
    body:
      'Dogs barking, cars passing, exterior neighborhood sound, and small room details are triggered at varied intervals instead of looping predictably.',
  },
  {
    title: 'Moving ambient emitters',
    body:
      'Some emitters shift between predetermined points, adding controlled motion to the house soundscape while keeping placement appropriate to the room.',
  },
  {
    title: 'Exterior sound and scale',
    body:
      'Distant exterior details suggest a world beyond the bedroom and feel larger from the perspective of a small dust bunny.',
  },
  {
    title: 'Spatial shaping in Wwise',
    body:
      'Spatialization, occlusion, transmission, diffusion, and reverb sends help ambience respond to direction, distance, furniture, walls, and room acoustics.',
  },
]

const mixSystems = [
  {
    title: 'UI ducking',
    body:
      'A Wwise Meter on the UI Audio Bus drives the ui_volume Game Parameter, lowering the Music Audio Bus around tutorial prompts and UI sounds so feedback remains clear.',
  },
  {
    title: 'Ambience ducking',
    body:
      'A Wwise Meter on the Music Audio Bus lowers room tone and ambience while music is active. When music fades or pauses, the ambience can return and keep the bedroom present.',
  },
  {
    title: 'player_state filtering',
    body:
      'The player_state State Group controls volume and low-pass filtering for music and ambience when UI panels, Memory Object panels, or pause states shift the player focus.',
  },
]

const getRouteFromHash = () => (window.location.hash === '#/dust-bunny' ? 'dust-bunny' : 'home')

function BackgroundAtmosphere({ route, activeIndex }) {
  return (
    <div
      className={`background-atmosphere ${route === 'dust-bunny' ? 'case-atmosphere' : 'home-atmosphere'}`}
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={`atmosphere-layer atmosphere-layer-${index}${activeIndex === index ? ' is-active' : ''}`}
        />
      ))}
    </div>
  )
}

function ButtonLink({ href, children, variant = 'primary', onClick }) {
  const external = href.startsWith('http')

  return (
    <a
      className={`button-link ${variant}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

function Figure({
  image,
  title,
  caption,
  alt,
  dark = false,
  tall = false,
  fit = 'cover',
  natural = false,
  decorative = false,
  expandable = false,
  onExpand,
}) {
  const imageAlt = decorative ? '' : alt ?? title
  const frameContent = (
    <>
      <img
        src={image}
        alt={imageAlt}
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
      <span className="figure-label">{title}</span>
      {expandable && <span className="expand-affordance">Click to expand</span>}
    </>
  )

  return (
    <figure className={`work-figure fit-${fit} ${natural ? 'natural' : ''} ${dark ? 'dark' : ''} ${tall ? 'tall' : ''}`}>
      <div className="image-frame">
        {expandable ? (
          <button
            className="image-expand-button"
            type="button"
            aria-label={`Expand image: ${title}`}
            onClick={() => onExpand?.({ image, title, alt: imageAlt })}
          >
            {frameContent}
          </button>
        ) : (
          frameContent
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function ImageLightbox({ item, onClose }) {
  const closeButtonRef = useRef(null)
  const isOpen = Boolean(item)

  useEffect(() => {
    if (!isOpen) return undefined

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    document.body.style.overflow = 'hidden'

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!item) return null

  return createPortal(
    <div
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} image preview`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="lightbox-panel">
        <div className="lightbox-toolbar">
          <button ref={closeButtonRef} type="button" aria-label="Close image preview" onClick={onClose}>Close</button>
        </div>
        <div
          className="lightbox-image-wrap"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose()
            }
          }}
        >
          <img src={item.image} alt={item.alt} />
        </div>
        <p>{item.title}</p>
      </div>
    </div>,
    document.body,
  )
}

function ReelEmbed({ work }) {
  return (
    <article className="reel-entry">
      <div className="video-panel">
        {work.embed ? (
          <iframe
            title={work.embedTitle ?? work.title}
            src={work.embed}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="video-placeholder technical-reel-placeholder">
            <span>Technical Audio Reel</span>
            <p>Gameplay-responsive systems, Wwise implementation, RTPCs, spatial ambience, and mix behavior.</p>
          </div>
        )}
      </div>
      <div className="reel-copy">
        <p className="eyebrow">{work.label}</p>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <div className="tag-row">
          {work.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        {work.href && (
          <ButtonLink href={work.href}>
            {work.cta}
          </ButtonLink>
        )}
      </div>
    </article>
  )
}

function CompactReelCard({ work }) {
  return (
    <article className="compact-reel-card">
      <div>
        <p className="eyebrow">{work.label}</p>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <div className="tag-row">
          {work.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <ButtonLink href={work.href} variant="secondary">
        {work.cta}
      </ButtonLink>
    </article>
  )
}

function FeaturedReel({ work }) {
  return (
    <div className="hero-featured-reel">
      <div className="video-panel featured">
        {work.embed ? (
          <iframe
            title={work.embedTitle ?? `Featured reel: ${work.title}`}
            src={work.embed}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="video-placeholder technical-reel-placeholder">
            <span>Featured Technical Audio Reel</span>
            <p>Gameplay-responsive systems, Wwise implementation, adaptive music, RTPCs, spatial ambience, and mix behavior.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function DustBunnyTeaser() {
  return (
    <article className="case-teaser">
      <div>
        <p className="eyebrow">{dustBunnyTeaser.label}</p>
        <h3>{dustBunnyTeaser.title}</h3>
        <p>{dustBunnyTeaser.description}</p>
        <div className="tag-row">
          {dustBunnyTeaser.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <ButtonLink href={dustBunnyTeaser.href} variant="secondary">{dustBunnyTeaser.cta}</ButtonLink>
    </article>
  )
}

function SiteNav({ isCompact, isMobileMenuOpen, onToggleMenu, onCloseMenu }) {
  return (
    <nav className={`site-nav${isCompact ? ' is-compact' : ''}${isMobileMenuOpen ? ' is-menu-open' : ''}`}>
      <div>
        <a className="brand" href="#home" aria-label="Joshua Yeo Audio, Technical Sound Design" onClick={onCloseMenu}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-copy">
            <span className="brand-title">Joshua Yeo Audio</span>
            <span className="brand-subtitle">Sound Design / Technical Audio</span>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-menu"
          aria-label="Toggle navigation menu"
          onClick={onToggleMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <div className="nav-links" id="site-menu">
          <a href={links.home} onClick={onCloseMenu}>Reels</a>
          <a href={links.unityCaseStudy} onClick={onCloseMenu}>Case Study</a>
          <a href="#about" onClick={onCloseMenu}>About</a>
          <a href={links.resume} onClick={onCloseMenu}>Resume</a>
          <a href="#contact" onClick={onCloseMenu}>Contact</a>
        </div>
      </div>
    </nav>
  )
}

function HomePage({ onActiveAtmosphereChange }) {
  useEffect(() => {
    onActiveAtmosphereChange(0)

    const sections = Array.from(document.querySelectorAll('[data-home-atmosphere]'))
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visibleEntries.length) return

        const nextIndex = sections.indexOf(visibleEntries[0].target)
        if (nextIndex >= 0) {
          onActiveAtmosphereChange(nextIndex)
        }
      },
      {
        rootMargin: '-24% 0px -48% 0px',
        threshold: [0.18, 0.35, 0.55, 0.75],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [onActiveAtmosphereChange])

  return (
    <>
      <section id="home" className="hero-shell" data-home-atmosphere>
        <p className="eyebrow hero-eyebrow">Featured Technical Sound Design Reel</p>
        <FeaturedReel work={featuredReel} />
      </section>

      <section id="reels" className="section-shell selected-work" data-home-atmosphere>
        <div className="reel-list">
          <DustBunnyTeaser />
          <ReelEmbed work={unrealReel} />
        </div>
      </section>

      <AboutSection atmosphereSection />
      <ContactSection atmosphereSection />
    </>
  )
}

function DustBunnyCaseStudyPage({ onActiveAtmosphereChange, onExpandImage }) {
  const [activeCaseSection, setActiveCaseSection] = useState(0)

  const caseSectionClassName = (index, extraClass = '') => {
    const distance = Math.abs(activeCaseSection - index)
    const emphasisClass = distance === 0
      ? 'is-case-active'
      : distance === 1
        ? 'is-case-nearby'
        : 'is-case-inactive'

    return ['case-section', extraClass, emphasisClass].filter(Boolean).join(' ')
  }

  useEffect(() => {
    onActiveAtmosphereChange(0)

    const sections = Array.from(document.querySelectorAll('.case-study .case-section'))
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visibleEntries.length) return

        const nextIndex = sections.indexOf(visibleEntries[0].target)
        if (nextIndex >= 0) {
          setActiveCaseSection(nextIndex)
          onActiveAtmosphereChange(nextIndex)
        }
      },
      {
        rootMargin: '-30% 0px -42% 0px',
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [onActiveAtmosphereChange])

  return (
    <section className="case-study">
      <div className="case-hero">
        <div>
          <p className="eyebrow">Main Case Study</p>
          <h2>Dust Bunny</h2>
          <p>
            Adaptive music, gameplay-responsive SFX, spatial ambience, and mix-control systems for a cozy 3D narrative-platformer about a sentient bunny-shaped dust clump moving through a messy bedroom.
          </p>
          <div className="focus-row">
            {caseFocus.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="case-actions">
            <ButtonLink href={links.unityTechnicalReel} variant="secondary">Watch Reel</ButtonLink>
            <ButtonLink href={links.dustBunnyItch} variant="secondary">Play Dust Bunny</ButtonLink>
            <ButtonLink href="#reels" variant="secondary">Back to Reels</ButtonLink>
          </div>
        </div>
        <dl className="meta-panel">
          {projectMeta.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className={caseSectionClassName(0, 'overview-section')}>
        <div className="case-section-heading">
          <p>01</p>
          <h3>Overview and Design Goal</h3>
        </div>
        <div className="case-copy">
          <p>
            Dust Bunny&apos;s audio supports the player&apos;s experience of a bedroom from a very small perspective. Room tone, spatial ambience, object interactions, movement sounds, exterior sound, and music transitions all contribute to scale, emotional pacing, and readability.
          </p>
          <p>
            The project demonstrates technical audio as a player-facing craft: implementation choices affect when music enters, how ambience returns, how UI feedback cuts through, how danger changes in real time, and how physical movement affects the sound of the character and surrounding clutter.
          </p>
        </div>
        <Figure
          image={assetPath('dust-bunny-still.png')}
          title="Dust Bunny still"
          alt="In-game screenshot from Dust Bunny showing the small dust bunny character within a bedroom-scale environment."
          caption="Dust Bunny is a cozy 3D narrative-platformer about a sentient bunny-shaped dust clump navigating a lived-in bedroom."
          tall
          fit="contain"
          natural
          expandable
          onExpand={onExpandImage}
        />
      </section>

      <section className={caseSectionClassName(1)}>
        <div className="case-section-heading">
          <p>02</p>
          <h3>Adaptive Music System</h3>
        </div>
        <div className="case-copy">
          <p>
            Dust Bunny&apos;s music adapts through Wwise State Groups, Music Switch Containers, Music Playlist Containers, and Unity C# trigger scripts. The high-level mus_state group controls the main mus_game container, while zone-specific state groups shape musical progression inside the first two areas.
          </p>
          <div className="state-list">
            {musicStates.map(([name, body]) => (
              <article key={name}>
                <strong>{name}</strong>
                <span>{body}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="image-pair">
          <Figure
            image={assetPath('wwise-state-groups.png')}
            title="Wwise state groups"
            alt="Wwise project hierarchy showing adaptive music State Groups and Music Switch Containers for Dust Bunny."
            caption="Wwise music structure showing State Groups and Music Switch Containers used to organize zone-based adaptive music."
            dark
            fit="contain"
            expandable
            onExpand={onExpandImage}
          />
          <Figure
            image={assetPath('unity-trigger.png')}
            title="Unity trigger"
            alt="Unity Inspector and scene view showing a music trigger GameObject configured to update Wwise music states."
            caption="Unity trigger setup used to update Wwise music states as the player moves through progression areas."
            dark
            fit="contain"
            expandable
            onExpand={onExpandImage}
          />
        </div>
        <div className="progression-list">
          {musicProgression.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <Figure
          image={assetPath('rtpc-curve.png')}
          title="roomba_to_bunny RTPC"
          alt="Wwise RTPC curve showing distance-based parameter control for Roomba chase music behavior."
          caption="RTPC curve for Roomba distance-based music behavior, shaping playback response as danger gets closer."
          dark
          fit="contain"
          expandable
          onExpand={onExpandImage}
        />
      </section>

      <section className={caseSectionClassName(2, 'split')}>
        <div className="case-section-heading">
          <p>03</p>
          <h3>Gameplay-Responsive SFX and Physics Audio</h3>
        </div>
        <div className="case-copy">
          <p>
            Gameplay-responsive SFX are tied to player growth, movement speed, and object physics. These systems connect sound to the dust bunny&apos;s changing body and to the physical clutter that defines the bedroom.
          </p>
          <div className="callout-list">
            {responsiveAudio.map((item) => (
              <article key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <Figure
          image={assetPath('physics-audio-script.png')}
          title="Physics audio script"
          alt="Unity Inspector or script screenshot showing physics-based audio parameters for interactable game objects."
          caption="Physics-based audio setup for interactable objects, connecting collision and movement behavior to audio response."
          dark
          fit="contain"
          expandable
          onExpand={onExpandImage}
        />
      </section>

      <section className={caseSectionClassName(3, 'ambience-section')}>
        <div className="case-section-heading">
          <p>04</p>
          <h3>Spatial Ambience and Environmental Life</h3>
        </div>
        <div className="case-copy wide">
          <p>
            The ambience system combines room tone, localized emitters, randomized intermittent playback, moving ambient emitters, and exterior sound. This helps the house feel lived-in even when the player is alone, while reinforcing the scale of the room from the perspective of a small dust bunny.
          </p>
          <p>
            The ambience system separates emitter movement from playback timing, allowing sounds to move between predefined points while Wwise events are posted at varied intervals.
          </p>
          <div className="ambience-notes">
            {ambienceDetails.map((item) => (
              <article key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="image-pair">
          <Figure
            image={assetPath('ambient-emitter-system.png')}
            title="Ambient emitter system"
            alt="Unity scene and Inspector showing an ambient emitter GameObject with path points, movement settings, Wwise event playback, and randomized interval controls."
            caption="Ambient emitter setup in Unity, using predefined path points, randomized wait times, and Wwise event playback to make environmental sounds move through the house."
            dark
            fit="contain"
            expandable
            onExpand={onExpandImage}
          />
          <Figure
            image={assetPath('ambient-emitter-movement-code.png')}
            title="Ambient emitter movement"
            alt="C# coroutine code showing an ambient emitter moving toward predefined target points, waiting for a randomized interval, and choosing a new target."
            caption="Movement loop for ambient emitters, moving sounds between predefined target points with randomized wait times."
            dark
            fit="contain"
            expandable
            onExpand={onExpandImage}
          />
        </div>
      </section>

      <section className={caseSectionClassName(4, 'split')}>
        <div className="case-section-heading">
          <p>05</p>
          <h3>UI Ducking, Ambience Ducking, and Player State</h3>
        </div>
        <div className="mix-layout">
          {mixSystems.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={caseSectionClassName(5, 'reflection-section')}>
        <div className="case-section-heading">
          <p>06</p>
          <h3>Reflection</h3>
        </div>
        <div className="reflection-note">
          <p>
            Dust Bunny reinforced how much implementation choices shape the emotional effect of sound design. Timing, transitions, ducking, filtering, spatialization, and responsiveness all change how a player reads a moment. The smallest details often decide whether a sound feels attached to the world or simply placed on top of it.
          </p>
        </div>
      </section>

      <ContactSection />
    </section>
  )
}

function AboutSection({ atmosphereSection = false }) {
  return (
    <section id="about" className="section-shell about-section" data-home-atmosphere={atmosphereSection ? true : undefined}>
      <figure className="work-figure fit-cover">
        <div className="image-frame">
          <img src={assetPath('profile.jpg')} alt="Portrait photo of Joshua Yeo." />
        </div>
      </figure>
      <div>
        <p className="eyebrow">About</p>
        <h2>Hi! I’m Josh. I build responsive audio systems for games.</h2>
        <p>
          I work between sound design and implementation to create gameplay-driven audio that supports player feedback, immersion, and emotional impact. Weirdly, the small implementation choices are what excite me the most: the way a minute decision in how sound enters, shifts, or makes space at just the right time can change what a player actually experiences and feels.
        </p>
        <p>
          Before audio, I spent years building and running teams in fast-moving environments. That experience shaped me and how I collaborate: I value process, communication (!!), and what the people around me actually need as much as what sounds right.
        </p>
        <p>
          I hold a Bachelor of Music from the University of Toronto, and I’m based in Toronto.
        </p>
      </div>
      <div className="about-tools" aria-label="Tools and systems">
        <h3>Tools & Systems</h3>
        <div className="about-tool-groups">
          <div className="about-tool-group">
            <span>Audio</span>
            <p>Sound Design · Technical Sound Design · Audio Implementation · Adaptive Music · Dialogue Systems · Editing · Mixing</p>
          </div>
          <div className="about-tool-group">
            <span>Engines & Middleware</span>
            <p>Unity · Unreal Engine · Wwise · FMOD</p>
          </div>
          <div className="about-tool-group">
            <span>Implementation</span>
            <p>C# · C++ · Blueprints · RTPCs · States · Event-Driven Audio · Physics-Based Audio · Spatial Audio</p>
          </div>
          <div className="about-tool-group">
            <span>Audio Tools</span>
            <p>Reaper · Ableton Live · Max/MSP</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection({ atmosphereSection = false }) {
  return (
    <section id="contact" className="section-shell contact-section" data-home-atmosphere={atmosphereSection ? true : undefined}>
      <div className="section-heading">
        <p>Contact</p>
      </div>
      <a className="contact-email" href={links.email}>{emailAddress}</a>
      <div className="contact-actions">
        <ButtonLink href={links.email}>Email</ButtonLink>
        <ButtonLink href={links.linkedin} variant="secondary">LinkedIn</ButtonLink>
        <ButtonLink href={links.itch} variant="secondary">itch.io</ButtonLink>
      </div>
    </section>
  )
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash)
  const [isNavCompact, setIsNavCompact] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lightboxItem, setLightboxItem] = useState(null)
  const [activeAtmosphereIndex, setActiveAtmosphereIndex] = useState(0)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash())
      setActiveAtmosphereIndex(0)
      setIsMobileMenuOpen(false)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    let frameId = 0

    const updateNavState = () => {
      frameId = 0
      setIsNavCompact(window.scrollY > 56)
    }

    const handleScroll = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateNavState)
    }

    updateNavState()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (route === 'dust-bunny') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      const hash = window.location.hash.replace('#', '')
      if (!hash || hash.startsWith('/')) return

      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [route])

  return (
    <main>
      <BackgroundAtmosphere route={route} activeIndex={activeAtmosphereIndex} />

      <SiteNav
        isCompact={isNavCompact}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMenu={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        onCloseMenu={closeMobileMenu}
      />

      {route === 'dust-bunny' ? (
        <DustBunnyCaseStudyPage onActiveAtmosphereChange={setActiveAtmosphereIndex} onExpandImage={setLightboxItem} />
      ) : (
        <HomePage onActiveAtmosphereChange={setActiveAtmosphereIndex} />
      )}

      <ImageLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </main>
  )
}

export default App

export const dictionaryData = [
  {
    id: 'flying',
    title: 'Flying Skyward',
    category: 'Psychological',
    shortDesc:
      'Signifies ultimate control, liberation, breaking boundaries, or a deep desire to escape constraints.',
    fullDesc:
      'Flying dreams usually represent confidence, freedom, and seeing matters from a broader life perspective. Flying with ease signifies full control over your fate. If struggling to fly, crashing, or hitting power lines, the archetype represents unrecognized real-world friction, insecurity, or heavy psychological blockages hindering your progress.',
    symbolism: 'Control, Freedom, High Ambition',
    frequency: 'High Rate',
    icon: 'cloud',
  },
  {
    id: 'falling',
    title: 'Falling Into Void',
    category: 'Emotional',
    shortDesc:
      'Suggests powerlessness, underlying loss of security, deep anxiety, or holding on to situations too tightly.',
    fullDesc:
      "Falling represents an emotional state of feeling out of control or overwhelmed by real-life responsibilities. Psychologically, it often suggests a major transitional crisis where you've lost reliable footing (such as job loss or relational stress). Jung viewed falling as a healthy unconscious counterweight to excessive conscious ego inflation.",
    symbolism: 'Surrender, Anxiety, Vulnerability',
    frequency: 'Extremely Common',
    icon: 'trending-down',
  },
  {
    id: 'snakes',
    title: 'Serpent Paths',
    category: 'Spiritual',
    shortDesc:
      'Represents rapid self-transformation, instinctual primordial energy, toxic elements, or cellular healing.',
    fullDesc:
      'Snakes are dual-faced archetypes. Historically, they represent raw creative healing power (shedding of old skin) and toxic dangers (venom). A snake chasing you symbolizes a vital truth or creative urge you are desperately running away from in waking life. Getting bitten means your psychological immune system is warning you about a close toxicity.',
    symbolism: 'Rebirth, Healing, Deception',
    frequency: 'High Rate',
    icon: 'shield-alert',
  },
  {
    id: 'water',
    title: 'Water & Tides',
    category: 'Emotional',
    shortDesc:
      'Reflects state of current emotional storage. Clear water stands for deep peace; turbulent storm waves suggest overwhelm.',
    fullDesc:
      'Water acts as the standard medium of emotion. Still, mirror-like lakes mirror self-reflection, spiritual clarity, and deep relaxation. Massive tidal waves sweeping your city represent suppressed emotional overwhelm, grief, or creative outbursts. Deep ocean diving highlights courageous attempts to probe deep into the subconscious mind.',
    symbolism: 'Subconscious, Emotion, Fluidity',
    frequency: 'Very High',
    icon: 'waves',
  },
  {
    id: 'death',
    title: 'Transitions & Rebirth',
    category: 'Psychological',
    shortDesc:
      'Rarely literal. Signifies major identity transitions, shedding of old routines, and room for rebirth.',
    fullDesc:
      'Dreams of your death or death of loved ones almost always highlight structural personality shifts. The ego is dissolving an outdated lifestyle standard to make conscious room for healthy growth patterns. It marks the symbolic ending of relationships, careers, or long-held beliefs, allowing spiritual rebirth to happen.',
    symbolism: 'Rebirth, Closure, Endings',
    frequency: 'Medium Rate',
    icon: 'skull',
  },
  {
    id: 'teeth',
    title: 'Teeth Shedding',
    category: 'Physical',
    shortDesc:
      'Relates to intense social insecurity, lack of self-expression power, aging fears, or physical sleep clenching.',
    fullDesc:
      'One of the most documented universal dreams. Loss of teeth indicates powerlessness, self-esteem crashes, or extreme worry over how peers perceive you. Symbolically, humans use teeth to chew, bite, and claim power. Losing them shows power drains. Physically, this dream is strongly triggered by unconscious nocturnal teeth clenching (bruxism).',
    symbolism: 'Powerlessness, Age Fears, Communication',
    frequency: 'Extremely Common',
    icon: 'smile',
  },
];

export const auraWaveSettings = {
  peaceful: {
    label: 'Peaceful Wave',
    freq: 'Vibrating @ 528Hz',
    background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.6), rgba(99, 102, 241, 0.5))',
    blur: 'blur(25px)',
    speed: '8s',
  },
  anxious: {
    label: 'Anxiety Charge',
    freq: 'Vibrating @ 120Hz (Agitated)',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.7), rgba(220, 38, 38, 0.6))',
    blur: 'blur(35px)',
    speed: '3s',
  },
  mysterious: {
    label: 'Esoteric Pulse',
    freq: 'Vibrating @ 432Hz (Cosmic)',
    background: 'linear-gradient(135deg, rgba(224, 130, 149, 0.7), rgba(124, 58, 237, 0.6))',
    blur: 'blur(20px)',
    speed: '12s',
  },
  lucid: {
    label: 'Lucid Projection',
    freq: 'Vibrating @ 963Hz (Sovereign)',
    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.7), rgba(79, 70, 229, 0.6))',
    blur: 'blur(18px)',
    speed: '6s',
  },
};

export const oracleCards = [
  {
    id: 'oracleCard1',
    icon: 'moon',
    title: '01. The Moon',
    subtitle: 'Mystery & Illusions',
    mantra:
      '"I honor the shadow elements of my current rest. Hidden secrets translate into future pathways."',
    task: 'Write down any colors or sounds you recall first thing tomorrow morning.',
    topIcon: 'star',
  },
  {
    id: 'oracleCard2',
    icon: 'compass',
    title: '02. The Eclipse',
    subtitle: 'Sudden Realignment',
    mantra: '"Sudden shifts are welcome alignments. My dream states purge outdated routines."',
    task: 'Release a task you have over-managed today. Delegate and find stillness.',
    topIcon: 'sparkles',
    spinIcon: true,
  },
  {
    id: 'oracleCard3',
    icon: 'globe',
    title: '03. The Portal',
    subtitle: 'Lucid Projection',
    mantra: '"I am the sovereign creator of my mental landscape. Inside my sleep, I design reality."',
    task: "Perform a quick 'reality check' twice today by looking closely at your hands.",
    topIcon: 'eye',
  },
];

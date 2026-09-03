import { MasterCatechismItem, ReadinessCheckItem, RuleOfLifeHabit } from '../types';

// Appendix A: The Rite of Confirmation Step by Step
export interface RiteMoment {
  moment: string;
  whatHappens: string;
  howITakePart: string;
}

export const APPENDIX_A_RITE: RiteMoment[] = [
  {
    moment: 'Presentation',
    whatHappens: 'The candidates are presented to the bishop or other minister.',
    howITakePart: 'Stand attentively and answer if the local rite asks you to do so.',
  },
  {
    moment: 'Homily',
    whatHappens: 'The minister explains the mystery and duties of Confirmation.',
    howITakePart: 'Listen for how the Holy Spirit strengthens Baptism and sends the Church.',
  },
  {
    moment: 'Baptismal promises',
    whatHappens: 'Candidates renounce Satan and profess the Catholic faith.',
    howITakePart: 'Answer sincerely and clearly with the whole group.',
  },
  {
    moment: 'Silent prayer',
    whatHappens: 'The minister invites everyone to pray for the candidates.',
    howITakePart: 'Ask inwardly for the Holy Spirit and the seven gifts.',
  },
  {
    moment: 'Laying on of hands',
    whatHappens: 'The minister extends hands and invokes the sevenfold Spirit.',
    howITakePart: 'Stand in reverent prayer and receive the Church\'s intercession.',
  },
  {
    moment: 'Anointing',
    whatHappens: 'Each candidate is anointed on the forehead with sacred chrism.',
    howITakePart: 'Approach calmly; your sponsor places a hand on your shoulder if directed.',
  },
  {
    moment: 'Sacramental words',
    whatHappens: 'The minister says, “N., be sealed with the Gift of the Holy Spirit.”',
    howITakePart: 'Answer, “Amen.”',
  },
  {
    moment: 'Sign of peace',
    whatHappens: 'The minister says, “Peace be with you.”',
    howITakePart: 'Answer, “And with your spirit.”',
  },
  {
    moment: 'Universal Prayer',
    whatHappens: 'The Church prays for the newly confirmed and for the world.',
    howITakePart: 'Join the petitions and pray for the mission now entrusted to you.',
  },
  {
    moment: 'Eucharist and blessing',
    whatHappens: 'Mass continues, usually with a commemoration of the newly confirmed.',
    howITakePart: 'Participate fully, receive Communion if properly disposed and give thanks.',
  },
];

export const APPENDIX_A_NOTE =
  'UPDATED PRACTICE: Older catechisms may describe a light blow on the cheek. The present Roman Rite instead gives the sign of peace after the anointing.';

// Appendix B: The Gifts and Fruits at a Glance
export interface GiftDefinition {
  gift: string;
  whatItPerfects: string;
  questionForDiscernment: string;
}

export const APPENDIX_B_GIFTS: GiftDefinition[] = [
  {
    gift: 'Wisdom',
    whatItPerfects: 'Tastes divine things and judges life in the light of God.',
    questionForDiscernment: 'What choice leads me closer to God?',
  },
  {
    gift: 'Understanding',
    whatItPerfects: 'Penetrates more deeply into the truths of faith.',
    questionForDiscernment: 'What mystery of faith should I study more carefully?',
  },
  {
    gift: 'Counsel',
    whatItPerfects: 'Helps practical judgement under the Spirit\'s guidance.',
    questionForDiscernment: 'What is the right action here and whom should I ask?',
  },
  {
    gift: 'Fortitude',
    whatItPerfects: 'Gives steadfast courage to do and endure what is right.',
    questionForDiscernment: 'What good am I avoiding because it is difficult?',
  },
  {
    gift: 'Knowledge',
    whatItPerfects: 'Sees created things truthfully and orders them to God.',
    questionForDiscernment: 'Am I using this gift or possession according to God\'s purpose?',
  },
  {
    gift: 'Piety',
    whatItPerfects: 'Forms filial love for God and reverence for his family.',
    questionForDiscernment: 'How can I pray and serve with a childlike heart?',
  },
  {
    gift: 'Fear of the Lord',
    whatItPerfects: 'Fills us with awe and loving sorrow at offending God.',
    questionForDiscernment: 'Do I honour God more than approval, comfort or success?',
  },
];

export interface FruitDefinition {
  fruit: string;
  definition: string;
}

export const APPENDIX_B_FRUITS: FruitDefinition[] = [
  { fruit: 'Charity', definition: 'Loving God above all and our neighbour for God\'s sake.' },
  { fruit: 'Joy', definition: 'Spiritual gladness in God and his goodness.' },
  { fruit: 'Peace', definition: 'The tranquillity of rightly ordered love.' },
  { fruit: 'Patience', definition: 'Enduring delay, suffering or provocation without abandoning charity.' },
  { fruit: 'Kindness', definition: 'A ready and considerate desire to do good.' },
  { fruit: 'Goodness', definition: 'Moral uprightness expressed in generous action.' },
  { fruit: 'Generosity', definition: 'A large-hearted readiness to give and serve.' },
  { fruit: 'Gentleness', definition: 'Strength governed by humility and charity.' },
  { fruit: 'Faithfulness', definition: 'Reliability and constancy towards God and others.' },
  { fruit: 'Modesty', definition: 'Dignified restraint in appearance, speech and conduct.' },
  { fruit: 'Self-control', definition: 'Government of desires according to reason and grace.' },
  { fruit: 'Chastity', definition: 'Integration of sexuality within one\'s state of life and vocation.' },
];

// Appendix C: Choosing a Sponsor and, Where Customary, a Saint
export interface SponsorRequirement {
  requirement: string;
  whatItMeans: string;
}

export const APPENDIX_C_SPONSOR_REQUIREMENTS: SponsorRequirement[] = [
  {
    requirement: 'Chosen suitably',
    whatItMeans: 'The person is designated by the candidate, parents or pastor and genuinely intends to fulfil the role.',
  },
  {
    requirement: 'Catholic initiation',
    whatItMeans: 'The sponsor is a Catholic who has been confirmed and has received the Holy Eucharist.',
  },
  {
    requirement: 'Mature enough',
    whatItMeans: 'Ordinarily the sponsor has completed the sixteenth year, unless lawful local provision or a just exception applies.',
  },
  {
    requirement: 'Life of faith',
    whatItMeans: 'The sponsor leads a life in harmony with the Catholic faith and the responsibility undertaken.',
  },
  {
    requirement: 'Canonically free',
    whatItMeans: 'The sponsor is not bound by a canonical penalty and is not the candidate\'s father or mother.',
  },
];

export const APPENDIX_C_NOTE =
  'As far as possible, a candidate has one sponsor. The sponsor presents the candidate and afterwards helps the newly confirmed live as a true witness of Christ. It is desirable, though not required, to choose one of the baptismal godparents, showing the unity of Baptism and Confirmation.';

export const APPENDIX_C_SAINT_GUIDE = {
  title: 'A Confirmation name',
  description:
    'The sacrament does not require a new name. Where local custom permits or encourages one, choosing the name of a canonised or beatified saint can express a desire for heavenly friendship and imitation. It must never distract from the candidate\'s baptismal identity or become merely decorative.',
  goodDiscernment:
    'Choose a saint because his or her life leads you towards Christ. Read a reliable life, learn the saint\'s feast day and virtues, and ask for intercession. Follow parish instructions about whether to use your baptismal name or an additional saint\'s name.',
};

// Appendix D: Prayers and a Rule of Life
export interface RuleOfLifeItem {
  id: string;
  rhythm: 'Daily' | 'Weekly' | 'Regularly' | 'In decisions' | 'In the parish';
  practice: string;
  advice: string;
}

export const APPENDIX_D_RULE_ITEMS: RuleOfLifeItem[] = [
  {
    id: 'rule-1',
    rhythm: 'Daily',
    practice: 'Morning offering; a passage of Scripture; examination of conscience; prayer to the Holy Spirit.',
    advice: 'Begin each morning giving the day to God; close each evening reviewing your thoughts and acts.',
  },
  {
    id: 'rule-2',
    rhythm: 'Weekly',
    practice: 'Sunday Mass; a deliberate work of charity; time free from unnecessary digital noise.',
    advice: 'Never miss Sunday Mass without serious reason; turn off screens for quiet reflection.',
  },
  {
    id: 'rule-3',
    rhythm: 'Regularly',
    practice: 'Sacramental Confession; Eucharistic adoration or a visit to the Blessed Sacrament; sound Catholic study.',
    advice: 'Confess monthly or whenever aware of grave sin; spend quiet minutes before the Tabernacle.',
  },
  {
    id: 'rule-4',
    rhythm: 'In decisions',
    practice: 'Ask what is true, good and loving; seek counsel; reject occasions of sin; choose the duties of your vocation.',
    advice: 'When faced with choices, consult parents, mentors, or priests, and obey your formed conscience.',
  },
  {
    id: 'rule-5',
    rhythm: 'In the parish',
    practice: 'Take part faithfully and find a concrete form of service suited to your gifts, age and safeguarding arrangements.',
    advice: 'Serve as an altar server, reader, musician, welcoming team, or parish charity volunteer.',
  },
];

export const APPENDIX_D_PRAYERS = [
  {
    id: 'come-holy-spirit',
    title: 'Come, Holy Spirit',
    latin: 'Veni, Sancte Spiritus',
    text: 'Come, Holy Spirit, fill the hearts of your faithful and kindle in them the fire of your love. Send forth your Spirit and they shall be created, and you shall renew the face of the earth. Amen.',
  },
  {
    id: 'prayer-seven-gifts',
    title: 'Prayer for the Seven Gifts',
    text: 'Holy Spirit, give me wisdom to seek God, understanding to know the faith, counsel to choose rightly, fortitude to persevere, knowledge to order created things well, piety to love the Father and fear of the Lord to worship him in awe. Amen.',
  },
  {
    id: 'before-confirmation',
    title: 'Before Confirmation',
    text: 'Lord Jesus Christ, I belong to you through Baptism. Cleanse me from sin, increase my faith and prepare me to receive the seal of your Spirit with humility, courage and joy. Amen.',
  },
  {
    id: 'after-confirmation',
    title: 'After Confirmation',
    text: 'Father, I thank you for the Gift of the Holy Spirit. Keep me united to Christ and his Church. Make my whole life a faithful witness in word, deed, prayer and service. Amen.',
  },
  {
    id: 'for-sponsor-and-patron-saint',
    title: 'For My Sponsor and Patron Saint',
    text: 'God of grace, bless my sponsor and reward every good example. Saint N., faithful friend of Christ, pray that I may imitate your virtue, resist sin and fulfil the vocation God gives me. Amen.',
  },
];

// Appendix E: Summary Catechism (38 core Q&As from pages 20-21 of the PDF)
export const APPENDIX_E_SUMMARY_CATECHISM: MasterCatechismItem[] = [
  {
    id: 1,
    category: 'The Holy Spirit & Trinity',
    question: 'Who is the Holy Spirit?',
    answer: 'The third Person of the Blessed Trinity, true God with the Father and the Son.',
    gapPrompt: {
      textWithGaps: 'The [third Person] of the Blessed Trinity, [true God] with the Father and the Son.',
      correctWords: ['third Person', 'true God'],
      options: ['third Person', 'created prophet', 'true God', 'heavenly symbol'],
    },
  },
  {
    id: 2,
    category: 'The Holy Spirit & Trinity',
    question: 'How many gods are there?',
    answer: 'There is one God in three divine Persons.',
    gapPrompt: {
      textWithGaps: 'There is [one God] in [three divine Persons].',
      correctWords: ['one God', 'three divine Persons'],
      options: ['one God', 'three different gods', 'three divine Persons', 'a council of gods'],
    },
  },
  {
    id: 3,
    category: 'The Holy Spirit & Trinity',
    question: 'Is the Holy Spirit merely a force?',
    answer: 'No. He is a divine Person who knows, loves, guides and sanctifies.',
    gapPrompt: {
      textWithGaps: 'No. He is a [divine Person] who [knows, loves, guides and sanctifies].',
      correctWords: ['divine Person', 'knows, loves, guides and sanctifies'],
      options: ['divine Person', 'symbolic metaphor', 'knows, loves, guides and sanctifies', 'fades away'],
    },
  },
  {
    id: 4,
    category: 'Pentecost & Church',
    question: 'What happened at Pentecost?',
    answer: 'The Holy Spirit descended upon the Apostles and strengthened them to proclaim Christ.',
    gapPrompt: {
      textWithGaps: 'The Holy Spirit [descended upon the Apostles] and strengthened them to [proclaim Christ].',
      correctWords: ['descended upon the Apostles', 'proclaim Christ'],
      options: ['descended upon the Apostles', 'departed from earth', 'proclaim Christ', 'hide in secret'],
    },
  },
  {
    id: 5,
    category: 'Christian Initiation',
    question: 'Which are the sacraments of Christian initiation?',
    answer: 'Baptism, Confirmation and the Holy Eucharist.',
    gapPrompt: {
      textWithGaps: '[Baptism, Confirmation and the Holy Eucharist].',
      correctWords: ['Baptism, Confirmation and the Holy Eucharist'],
      options: ['Baptism, Confirmation and the Holy Eucharist', 'Penance and Matrimony', 'Holy Orders and Anointing', 'Ash Wednesday and Easter'],
    },
  },
  {
    id: 6,
    category: 'Christian Initiation',
    question: 'What does Confirmation do to baptismal grace?',
    answer: 'It completes and strengthens baptismal grace.',
    gapPrompt: {
      textWithGaps: 'It [completes and strengthens] baptismal grace.',
      correctWords: ['completes and strengthens'],
      options: ['completes and strengthens', 'cancels and replaces', 'renders void', 'removes'],
    },
  },
  {
    id: 7,
    category: 'Scripture & Tradition',
    question: 'Who instituted Confirmation?',
    answer: 'Jesus Christ instituted Confirmation.',
    gapPrompt: {
      textWithGaps: '[Jesus Christ] instituted Confirmation.',
      correctWords: ['Jesus Christ'],
      options: ['Jesus Christ', 'The Roman Emperor', 'The Apostles on their own', 'Medieval theologians'],
    },
  },
  {
    id: 8,
    category: 'Scripture & Tradition',
    question: 'How did the Apostles impart the Spirit to the baptized?',
    answer: 'By prayer and the laying on of hands.',
    gapPrompt: {
      textWithGaps: 'By [prayer] and the [laying on of hands].',
      correctWords: ['prayer', 'laying on of hands'],
      options: ['prayer', 'civic decrees', 'laying on of hands', 'reading speeches'],
    },
  },
  {
    id: 9,
    category: 'Scripture & Tradition',
    question: 'Where is this shown in Scripture?',
    answer: 'Especially in Acts 8:14-17 and Acts 19:5-6.',
    gapPrompt: {
      textWithGaps: 'Especially in [Acts 8:14-17] and [Acts 19:5-6].',
      correctWords: ['Acts 8:14-17', 'Acts 19:5-6'],
      options: ['Acts 8:14-17', 'Genesis 3:1', 'Acts 19:5-6', 'Leviticus 1:1'],
    },
  },
  {
    id: 10,
    category: 'The Sacrament of Confirmation',
    question: 'What does Confirmation mean?',
    answer: 'Strengthening.',
    gapPrompt: {
      textWithGaps: '[Strengthening].',
      correctWords: ['Strengthening'],
      options: ['Strengthening', 'Graduating', 'Ending', 'Retiring'],
    },
  },
  {
    id: 11,
    category: 'The Sacrament of Confirmation',
    question: 'Why is the sacrament called Chrismation?',
    answer: 'Because the baptized are anointed with sacred chrism.',
    gapPrompt: {
      textWithGaps: 'Because the baptized are [anointed with sacred chrism].',
      correctWords: ['anointed with sacred chrism'],
      options: ['anointed with sacred chrism', 'washed with plain water', 'blessed with flowers', 'enrolled in school'],
    },
  },
  {
    id: 12,
    category: 'Minister & Rite',
    question: 'Who is the ordinary minister?',
    answer: 'The bishop is the ordinary minister of Confirmation.',
    gapPrompt: {
      textWithGaps: 'The [bishop] is the [ordinary minister] of Confirmation.',
      correctWords: ['bishop', 'ordinary minister'],
      options: ['bishop', 'godparent', 'ordinary minister', 'school principal'],
    },
  },
  {
    id: 13,
    category: 'Minister & Rite',
    question: 'May a priest confirm?',
    answer: 'Yes, when the law or competent authority grants the faculty.',
    gapPrompt: {
      textWithGaps: 'Yes, when the law or [competent authority] grants the [faculty].',
      correctWords: ['competent authority', 'faculty'],
      options: ['competent authority', 'general public', 'faculty', 'request of friends'],
    },
  },
  {
    id: 14,
    category: 'Minister & Rite',
    question: 'What is sacred chrism?',
    answer: 'Perfumed oil consecrated by a bishop.',
    gapPrompt: {
      textWithGaps: '[Perfumed oil] consecrated by a [bishop].',
      correctWords: ['Perfumed oil', 'bishop'],
      options: ['Perfumed oil', 'Pure wine', 'bishop', 'monk'],
    },
  },
  {
    id: 15,
    category: 'Minister & Rite',
    question: 'What is the essential rite in the Latin Church?',
    answer: 'Anointing the forehead with chrism by the laying on of the hand and the sacramental words.',
    gapPrompt: {
      textWithGaps: 'Anointing the [forehead with chrism] by the laying on of the hand and the [sacramental words].',
      correctWords: ['forehead with chrism', 'sacramental words'],
      options: ['forehead with chrism', 'hand with water', 'sacramental words', 'candidate\'s speech'],
    },
  },
  {
    id: 16,
    category: 'Minister & Rite',
    question: 'What words confer Confirmation?',
    answer: '“N., be sealed with the Gift of the Holy Spirit.”',
    gapPrompt: {
      textWithGaps: '“N., [be sealed] with the [Gift of the Holy Spirit].”',
      correctWords: ['be sealed', 'Gift of the Holy Spirit'],
      options: ['be sealed', 'be crowned', 'Gift of the Holy Spirit', 'reward of study'],
    },
  },
  {
    id: 17,
    category: 'Minister & Rite',
    question: 'What does the candidate answer?',
    answer: 'The candidate answers, “Amen.”',
    gapPrompt: {
      textWithGaps: 'The candidate answers, “[Amen].”',
      correctWords: ['Amen'],
      options: ['Amen', 'Thank you', 'So it begins', 'I promise'],
    },
  },
  {
    id: 18,
    category: 'Effects & Character',
    question: 'What does the spiritual seal mean?',
    answer: 'Christ marks us permanently with the indelible character of his Spirit.',
    gapPrompt: {
      textWithGaps: 'Christ marks us [permanently] with the [indelible character] of his Spirit.',
      correctWords: ['permanently', 'indelible character'],
      options: ['permanently', 'until high school', 'indelible character', 'temporary badge'],
    },
  },
  {
    id: 19,
    category: 'Effects & Character',
    question: 'Can Confirmation be repeated?',
    answer: 'No. It is received only once.',
    gapPrompt: {
      textWithGaps: 'No. It is received [only once].',
      correctWords: ['only once'],
      options: ['only once', 'every year', 'at each retreat', 'upon request'],
    },
  },
  {
    id: 20,
    category: 'Effects & Character',
    question: 'What is the chief effect of Confirmation?',
    answer: 'A special outpouring of the Holy Spirit, as at Pentecost.',
    gapPrompt: {
      textWithGaps: 'A [special outpouring] of the Holy Spirit, as at [Pentecost].',
      correctWords: ['special outpouring', 'Pentecost'],
      options: ['special outpouring', 'graduation honor', 'Pentecost', 'Mount Sinai'],
    },
  },
  {
    id: 21,
    category: 'Effects & Character',
    question: 'How does it unite us to Christ and the Church?',
    answer: 'It unites us more firmly to Christ and binds us more perfectly to the Church.',
    gapPrompt: {
      textWithGaps: 'It unites us [more firmly to Christ] and binds us [more perfectly to the Church].',
      correctWords: ['more firmly to Christ', 'more perfectly to the Church'],
      options: ['more firmly to Christ', 'loosely to religion', 'more perfectly to the Church', 'to social clubs'],
    },
  },
  {
    id: 22,
    category: 'Effects & Character',
    question: 'What special strength does it give?',
    answer: 'Strength to spread and defend the faith by word and deed.',
    gapPrompt: {
      textWithGaps: 'Strength to [spread and defend the faith] by [word and deed].',
      correctWords: ['spread and defend the faith', 'word and deed'],
      options: ['spread and defend the faith', 'argue without love', 'word and deed', 'physical force'],
    },
  },
  {
    id: 23,
    category: 'Gifts, Fruits & Virtues',
    question: 'What are the seven gifts?',
    answer: 'Wisdom, understanding, counsel, fortitude, knowledge, piety and fear of the Lord.',
    gapPrompt: {
      textWithGaps: '[Wisdom, understanding, counsel], fortitude, [knowledge, piety and fear of the Lord].',
      correctWords: ['Wisdom, understanding, counsel', 'knowledge, piety and fear of the Lord'],
      options: ['Wisdom, understanding, counsel', 'Wealth, health and luck', 'knowledge, piety and fear of the Lord', 'fame, beauty and wit'],
    },
  },
  {
    id: 24,
    category: 'Gifts, Fruits & Virtues',
    question: 'What do the gifts make us ready to do?',
    answer: 'They make us ready to follow the promptings of the Holy Spirit.',
    gapPrompt: {
      textWithGaps: 'They make us ready to follow the [promptings of the Holy Spirit].',
      correctWords: ['promptings of the Holy Spirit'],
      options: ['promptings of the Holy Spirit', 'opinions of influencers', 'whims of emotion', 'peer pressure'],
    },
  },
  {
    id: 25,
    category: 'Gifts, Fruits & Virtues',
    question: 'What are the theological virtues?',
    answer: 'Faith, hope and charity.',
    gapPrompt: {
      textWithGaps: '[Faith, hope and charity].',
      correctWords: ['Faith, hope and charity'],
      options: ['Faith, hope and charity', 'Prudence, justice and courage', 'Honor, wealth and pride', 'Knowledge and study'],
    },
  },
  {
    id: 26,
    category: 'Gifts, Fruits & Virtues',
    question: 'What are the cardinal virtues?',
    answer: 'Prudence, justice, fortitude and temperance.',
    gapPrompt: {
      textWithGaps: '[Prudence, justice, fortitude and temperance].',
      correctWords: ['Prudence, justice, fortitude and temperance'],
      options: ['Prudence, justice, fortitude and temperance', 'Faith, hope and charity', 'Seven sacraments', 'Ten commandments'],
    },
  },
  {
    id: 27,
    category: 'Gifts, Fruits & Virtues',
    question: 'What are the fruits of the Spirit?',
    answer: 'Perfections formed in us by the Spirit as we cooperate with grace.',
    gapPrompt: {
      textWithGaps: '[Perfections formed in us] by the Spirit as we [cooperate with grace].',
      correctWords: ['Perfections formed in us', 'cooperate with grace'],
      options: ['Perfections formed in us', 'Magical powers', 'cooperate with grace', 'seek popularity'],
    },
  },
  {
    id: 28,
    category: 'Gifts, Fruits & Virtues',
    question: 'What are charisms?',
    answer: 'Gifts of grace for the service and building up of the Church.',
    gapPrompt: {
      textWithGaps: 'Gifts of grace for the [service and building up of the Church].',
      correctWords: ['service and building up of the Church'],
      options: ['service and building up of the Church', 'personal profit', 'showing off in public', 'self-glorification'],
    },
  },
  {
    id: 29,
    category: 'Baptismal Promises',
    question: 'Why are baptismal promises renewed?',
    answer: 'To show that Confirmation follows Baptism and strengthens its grace.',
    gapPrompt: {
      textWithGaps: 'To show that Confirmation [follows Baptism] and [strengthens its grace].',
      correctWords: ['follows Baptism', 'strengthens its grace'],
      options: ['follows Baptism', 'replaces Baptism', 'strengthens its grace', 'cancels sins again'],
    },
  },
  {
    id: 30,
    category: 'Baptismal Promises',
    question: 'What does the candidate renounce?',
    answer: 'Satan, sin and everything opposed to God.',
    gapPrompt: {
      textWithGaps: '[Satan, sin] and everything [opposed to God].',
      correctWords: ['Satan, sin', 'opposed to God'],
      options: ['Satan, sin', 'secular subjects', 'opposed to God', 'human joy'],
    },
  },
  {
    id: 31,
    category: 'Baptismal Promises',
    question: 'What faith does the candidate profess?',
    answer: 'The one apostolic faith of the Catholic Church.',
    gapPrompt: {
      textWithGaps: 'The [one apostolic faith] of the [Catholic Church].',
      correctWords: ['one apostolic faith', 'Catholic Church'],
      options: ['one apostolic faith', 'personal private creed', 'Catholic Church', 'modern culture'],
    },
  },
  {
    id: 32,
    category: 'Spiritual Combat & Mission',
    question: 'Why is the confirmed called a soldier of Christ?',
    answer: 'Because Confirmation strengthens us for spiritual combat and witness.',
    gapPrompt: {
      textWithGaps: 'Because Confirmation strengthens us for [spiritual combat and witness].',
      correctWords: ['spiritual combat and witness'],
      options: ['spiritual combat and witness', 'fighting earthly wars', 'debating politicians', 'living in seclusion'],
    },
  },
  {
    id: 33,
    category: 'Preparation & Reception',
    question: 'Who can receive Confirmation?',
    answer: 'Every baptized person who has not already been confirmed.',
    gapPrompt: {
      textWithGaps: 'Every [baptized person] who has not [already been confirmed].',
      correctWords: ['baptized person', 'already been confirmed'],
      options: ['baptized person', 'unbaptized person', 'already been confirmed', 'ordained bishop'],
    },
  },
  {
    id: 34,
    category: 'Preparation & Reception',
    question: 'How should a candidate prepare?',
    answer: 'By instruction, intention, prayer, good works and proper disposition.',
    gapPrompt: {
      textWithGaps: 'By [instruction, intention], prayer, [good works and proper disposition].',
      correctWords: ['instruction, intention', 'good works and proper disposition'],
      options: ['instruction, intention', 'seeking fine attire', 'good works and proper disposition', 'procrastination'],
    },
  },
  {
    id: 35,
    category: 'Preparation & Reception',
    question: 'In what state should Confirmation be received?',
    answer: 'In the state of grace.',
    gapPrompt: {
      textWithGaps: 'In the [state of grace].',
      correctWords: ['state of grace'],
      options: ['state of grace', 'state of haste', 'mood of excitement', 'state of indifference'],
    },
  },
  {
    id: 36,
    category: 'Preparation & Reception',
    question: 'What sacrament should be received beforehand?',
    answer: 'The Sacrament of Penance should be received beforehand.',
    gapPrompt: {
      textWithGaps: 'The [Sacrament of Penance] should be received beforehand.',
      correctWords: ['Sacrament of Penance'],
      options: ['Sacrament of Penance', 'Sacrament of Matrimony', 'Sacrament of Holy Orders', 'Rite of Anointing'],
    },
  },
  {
    id: 37,
    category: 'Sponsor & Community',
    question: 'What is the sponsor\'s duty?',
    answer: 'To help the confirmed person live as a true witness and fulfil the sacrament\'s obligations.',
    gapPrompt: {
      textWithGaps: 'To help the confirmed person live as a [true witness] and fulfil the sacrament\'s [obligations].',
      correctWords: ['true witness', 'obligations'],
      options: ['true witness', 'silent relative', 'obligations', 'financial debts'],
    },
  },
  {
    id: 38,
    category: 'Perseverance & Rule of Life',
    question: 'How should the newly confirmed persevere?',
    answer: 'By Mass, Confession, prayer, Scripture, virtue, parish communion and service.',
    gapPrompt: {
      textWithGaps: 'By [Mass, Confession, prayer], Scripture, virtue, [parish communion and service].',
      correctWords: ['Mass, Confession, prayer', 'parish communion and service'],
      options: ['Mass, Confession, prayer', 'leaving after confirmation', 'parish communion and service', 'attending once a year'],
    },
  },
];

// Appendix F: Readiness and Review Guide (Page 22 of the PDF)
export const APPENDIX_F_AREAS: ReadinessCheckItem[] = [
  {
    id: 'readiness-1',
    area: 'Catholic faith',
    description: 'Can profess the Creed and explain simply who the Holy Spirit is and what Confirmation gives.',
    reviewed: false,
  },
  {
    id: 'readiness-2',
    area: 'Sacramental understanding',
    description: 'Knows the relation of Baptism, Confirmation and Eucharist; knows the minister, chrism, sacramental words, effects and character.',
    reviewed: false,
  },
  {
    id: 'readiness-3',
    area: 'Intention',
    description: 'Freely intends to receive Confirmation and is able to renew baptismal promises sincerely.',
    reviewed: false,
  },
  {
    id: 'readiness-4',
    area: 'State of grace',
    description: 'Understands mortal and venial sin, has examined conscience and has a practical opportunity for Confession.',
    reviewed: false,
  },
  {
    id: 'readiness-5',
    area: 'Prayer',
    description: 'Participates at Sunday Mass and is developing a sustainable habit of personal prayer.',
    reviewed: false,
  },
  {
    id: 'readiness-6',
    area: 'Witness and conduct',
    description: 'Understands that faith must be lived in truth, chastity, justice, mercy and service.',
    reviewed: false,
  },
  {
    id: 'readiness-7',
    area: 'Sponsor',
    description: 'Has a canonically suitable sponsor, or the parish has considered what is possible.',
    reviewed: false,
  },
  {
    id: 'readiness-8',
    area: 'Practical preparation',
    description: 'Knows the rite, responses, rehearsal arrangements, dress expectations and safeguarding procedures.',
    reviewed: false,
  },
  {
    id: 'readiness-9',
    area: 'Pastoral support',
    description: 'Any disability, learning difference, anxiety, family difficulty or access need has been met with reasonable and dignified adaptation.',
    reviewed: false,
  },
];

export const APPENDIX_F_SAFEGUARDING_NOTE =
  'Preparation must respect each candidate\'s dignity, freedom and capacity. Disability, learning difference, illness or social anxiety does not by itself prevent reception. No candidate should be shamed, manipulated, publicly interrogated or required to disclose private sins outside Confession. Concerns should be handled discreetly by the parish priest and those properly responsible.';

export const APPENDIX_F_CANONICAL_NOTE =
  'The universal law uses the age of discretion as a reference while permitting another age to be determined by competent authority. Follow the policy of the diocese; danger of death and other grave causes are treated specially by the Church\'s law.';

// Sources and doctrinal references (Page 23 of the PDF)
export const DOCTRINAL_SOURCES = {
  sacredScripture:
    'Acts 1-2, Acts 8:14-17, Acts 19:5-6, Isaiah 11:1-3, John 14-16, Romans 8, 1 Corinthians 12 and Galatians 5. Short quotations follow the English Standard Version - Catholic Edition.',
  ccc:
    'Catechism of the Catholic Church. Nos. 683-747 on the Holy Spirit; 1285-1321 on Confirmation; 1691-1698 on life in Christ; 1803-1845 on virtues, gifts and fruits.',
  compendium:
    'Compendium of the Catechism of the Catholic Church. Questions 265-270 on Confirmation and 136-146 on the Holy Spirit and the Church.',
  canonLaw:
    'Code of Canon Law. Canons 842, 879-896 and 872-874, especially the minister, candidate, age, sponsor, preparation and registration.',
  orderOfConfirmation:
    'Order of Confirmation. Current Roman Rite for England and Wales, especially the renewal of baptismal promises, laying on of hands, anointing with chrism and sign of peace.',
  josephDeharbe:
    'Joseph Deharbe, S.J., A Full Catechism of the Catholic Religion, English translation by John Fander (London, 1863), especially pp. 255-259.',
  doctrinalStandard:
    'Where local practice or terminology differs, the approved liturgical books, diocesan policy and the directions of the parish priest govern practical preparation. No text in this draft should be interpreted contrary to the Catechism of the Catholic Church or the competent ecclesiastical authority.',
};

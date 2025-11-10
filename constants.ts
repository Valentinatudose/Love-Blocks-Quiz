
import { ResultType, type QuizQuestion, type QuizResult } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'When a new relationship starts feeling serious, your first instinct is to:',
    options: [
      { text: 'Worry they might leave, so you look for constant reassurance.', resultType: ResultType.DramaMagnet },
      { text: 'Feel a bit trapped and start thinking about your exit strategy.', resultType: ResultType.EscapeArtist },
      { text: 'Worry that you\'re not good enough and try harder to please them.', resultType: ResultType.SelfSacrificer },
      { text: 'Find a small flaw about them and magnify it in your mind.', resultType: ResultType.Perfectionist },
    ],
  },
  {
    id: 2,
    text: 'Your partner has a busy week and is less communicative. You interpret this as:',
    options: [
      { text: 'A sign they’re pulling away, which makes you feel anxious and needy.', resultType: ResultType.DramaMagnet },
      { text: 'A welcome break, giving you a chance to enjoy your own space.', resultType: ResultType.EscapeArtist },
      { text: 'You must have done something wrong to make them distant.', resultType: ResultType.SelfSacrificer },
      { text: 'Their lack of effort is a red flag that the relationship isn’t "perfect".', resultType: ResultType.Perfectionist },
    ],
  },
  {
    id: 3,
    text: 'When it comes to expressing your needs in a relationship, you typically:',
    options: [
      { text: 'Keep them to yourself. Relying on someone else feels like a threat to your independence.', resultType: ResultType.EscapeArtist },
      { text: 'Feel guilty for having them, so you focus on their needs instead.', resultType: ResultType.SelfSacrificer },
      { text: 'Express them often, needing to know you’re on the same page constantly.', resultType: ResultType.DramaMagnet },
      { text: 'Struggle to voice them unless you can phrase them "perfectly".', resultType: ResultType.Perfectionist },
    ],
  },
   {
    id: 4,
    text: 'The phrase that best describes your relationship history is:',
    options: [
      { text: 'Giving your all to partners who didn’t seem to give it back.', resultType: ResultType.SelfSacrificer },
      { text: 'Ending good relationships because of seemingly small imperfections.', resultType: ResultType.Perfectionist },
      { text: 'A series of passionate but unstable emotional rollercoasters.', resultType: ResultType.DramaMagnet },
      { text: 'A collection of "almosts" that never got too serious.', resultType: ResultType.EscapeArtist },
    ],
  },
  {
    id: 5,
    text: 'What is your biggest fear in a relationship?',
    options: [
      { text: 'Losing your freedom and personal identity.', resultType: ResultType.EscapeArtist },
      { text: 'That your partner will see the "real" you and decide you’re not enough.', resultType: ResultType.SelfSacrificer },
      { text: 'Being abandoned or not being their number one priority.', resultType: ResultType.DramaMagnet },
      { text: 'Being trapped in a relationship that isn\'t flawless.', resultType: ResultType.Perfectionist },
    ],
  },
];

export const QUIZ_RESULTS: Record<ResultType, QuizResult> = {
  [ResultType.DramaMagnet]: {
    title: 'Your Hidden Love Block: The Drama Magnet',
    description: 'You crave deep connection, but a fear of abandonment often leads to anxiety, seeking reassurance, and unintentionally creating drama. Your love is deep, but your fear is loud.',
    psychology: 'This pattern is driven by a deep-seated fear of abandonment. This fear creates a need for constant validation, leading you to interpret neutral events as signs of rejection, which fuels anxiety and relationship instability.',
    nextStep: 'The R.E.S.E.T Method™ is designed to soothe this anxiety at its subconscious root. The "Erasure" and "Somatic Reboot" steps will help you build internal safety, so you can love from a place of security, not fear.'
  },
  [ResultType.EscapeArtist]: {
    title: 'Your Hidden Love Block: The Escape Artist',
    description: 'You value your independence, but this often creates a wall that keeps intimacy at a distance. When things get too close, your instinct is to retreat, sabotaging the connection you secretly want.',
    psychology: 'This pattern is driven by a fear of engulfment or losing your sense of self. You cherish independence, and as intimacy grows, it can feel threatening, causing an instinct to pull away and preserve your freedom.',
    nextStep: 'The R.E.S.E.T Method™ helps dismantle this wall without sacrificing your identity. Through "Recognition" and "Empowerment," we\'ll rewire the belief that deep connection means losing yourself, allowing you to embrace both intimacy and independence.'
  },
  [ResultType.Perfectionist]: {
    title: 'Your Hidden Love Block: The Perfectionist',
    description: 'When things are going well, you look for flaws. You hold your relationships (and yourself) to an impossible standard. This critical eye is a protective mechanism from past hurts, trying to prevent disappointment by controlling the outcome.',
    psychology: 'This pattern is driven by a fear of being hurt or disappointed. As a defense, you develop a critical eye, constantly scanning for flaws. Finding something "wrong" justifies ending things before you can be let down, keeping you in control.',
    nextStep: 'The R.E.S.E.T Method™ is incredibly effective at breaking this cycle. Using Advanced NLP in the "Erasure" step, we can rewrite the subconscious script that says "it must be perfect," empowering you to accept and nurture good-enough, healthy love.'
  },
  [ResultType.SelfSacrificer]: {
    title: 'Your Hidden Love Block: The Self-Sacrificer',
    description: 'Deep down, you carry a belief that you are not worthy of unconditional love. This leads to people-pleasing, over-giving, and settling for less, hoping to "earn" your partner’s affection while your own needs go unmet.',
    psychology: 'This pattern is driven by a core belief of "I am not enough." This feeling of unworthiness leads you to over-give and people-please, hoping to "earn" love while neglecting your own needs.',
    nextStep: 'The R.E.S.E.T Method™ directly heals this core wound. The "Empowerment" and "Transformation" steps install a new, unshakeable belief of self-worth at the subconscious level, making you a magnet for partners who celebrate your true value.'
  }
};
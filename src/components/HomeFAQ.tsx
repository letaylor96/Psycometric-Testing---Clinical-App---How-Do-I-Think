import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'How does this assessment fit into Applied AI Works Canada?',
    a: 'It gives participants, facilitators, and program leads a shared picture of how each participant thinks, learns, and adapts to AI-enabled work — so guidance, tools, and workflows can be matched to the person.',
  },
  {
    q: 'What is my cognitive style?',
    a: 'Your cognitive style is the consistent way you take in information, reason about problems, and make decisions. The cognitive style module surfaces your patterns and the conditions where you tend to do your best work.',
    link: '/personality-test',
    linkText: 'Begin the personality module →',
  },
  {
    q: 'How do I learn best?',
    a: 'The cognitive style module identifies your processing preferences — visual, analytical, narrative, intuitive — and how you tend to consolidate new information.',
  },
  {
    q: 'Does this diagnose ADHD, autism, or any mental health condition?',
    a: 'No. This is a structured self-assessment, not a clinical instrument. The attention and sensory-processing modules use established self-report inventories (WHO ASRS-v1.1, AQ-50) for reflection only. A diagnosis can only be made by a qualified clinician.',
    link: '/adhd-test',
    linkText: 'Open the attention-patterns module →',
  },
  {
    q: 'Is the cognitive reasoning module an IQ test?',
    a: "It is a structured reasoning module modelled on Raven's Progressive Matrices. It indicates how you approach abstract pattern problems under time pressure — useful as one signal in your profile, not a standalone IQ score.",
    link: '/free-iq-test',
    linkText: 'Open the reasoning module →',
  },
  {
    q: 'Are these modules scientifically grounded?',
    a: "Yes. Each module draws on peer-reviewed frameworks: the Big Five (OCEAN) model for personality, Raven's Progressive Matrices for reasoning, the WHO ASRS-v1.1 for attention self-report, and the AQ-50 for social and sensory patterns.",
  },
  {
    q: 'Is my data private?',
    a: 'Your results are stored locally in your browser by default. If you create an account, data is encrypted and stored securely. We do not share individual assessment data with third parties.',
  },
];

export const HomeFAQ = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
            Questions
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-3">
            Frequently asked.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            What this assessment is, and what it is not.
          </p>
        </motion.div>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <h3 className="font-serif text-base font-medium text-foreground mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              {faq.link && (
                <Link
                  to={faq.link}
                  className="inline-block mt-2 text-foreground text-sm font-medium underline-offset-4 hover:underline"
                >
                  {faq.linkText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

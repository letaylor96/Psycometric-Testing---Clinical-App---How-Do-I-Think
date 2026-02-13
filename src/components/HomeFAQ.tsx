import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'What is my IQ score?',
    a: "Take our free 25-question IQ test based on Raven's Progressive Matrices. You'll get your IQ score, percentile ranking, and cognitive breakdown instantly.",
    link: '/free-iq-test',
    linkText: 'Take the free IQ test →',
  },
  {
    q: 'What is my personality type?',
    a: 'Our Big Five (OCEAN) personality assessment reveals your unique combination of Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism with your MBTI equivalent.',
    link: '/personality-test',
    linkText: 'Take the personality test →',
  },
  {
    q: 'Do I have ADHD?',
    a: 'Our clinically-validated screening uses the WHO ASRS-v1.1 questionnaire combined with cognitive style profiling to identify attention patterns and neurodivergent traits.',
    link: '/adhd-test',
    linkText: 'Take the ADHD screening →',
  },
  {
    q: 'How do I learn best?',
    a: 'Our cognitive style assessment identifies your unique thinking patterns and processing preferences — whether you\'re a visual, analytical, or intuitive thinker.',
  },
  {
    q: 'Are these assessments scientifically validated?',
    a: "Yes. Our IQ test uses Raven's Progressive Matrices, personality uses the Big Five model, and ADHD screening uses the WHO ASRS-v1.1 — all backed by decades of peer-reviewed research.",
  },
  {
    q: 'Is my data private?',
    a: 'Your results are stored locally in your browser by default. If you create an account, data is encrypted and stored securely. We never share personal assessment data with third parties.',
  },
];

export const HomeFAQ = () => {
  return (
    <section className="py-12 sm:py-20 bg-muted/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Everything you need to know about our cognitive assessments.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 bg-card border border-border rounded-xl"
            >
              <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              {faq.link && (
                <Link to={faq.link} className="inline-block mt-2 text-primary text-sm font-medium hover:underline">
                  {faq.linkText}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

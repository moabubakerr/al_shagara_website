import { copy, FACEBOOK_URL } from '../content/content';
import { useEnquiryForm } from '../hooks/useEnquiryForm';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import styles from './ContactSection.module.css';

export function ContactSection() {
  const { field, handleSubmit, status, formRef } = useEnquiryForm('contact');
  const { form } = copy;

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <Container>
        <div className={styles.card}>
          <div>
            <h2 id="contact-title" className={styles.title}>
              {copy.contact.title}
            </h2>
            <p className={styles.body}>{copy.contact.body}</p>
          </div>

          <div className={styles.formColumn}>
            {status === 'success' ? (
              <p className={styles.success} role="status">
                {copy.contact.success}
              </p>
            ) : (
              <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
                <Input
                  {...field('fullName')}
                  label={form.fullName.label}
                  placeholder={form.fullName.placeholder}
                  autoComplete="name"
                  required
                />
                <div className={styles.row}>
                  <Input
                    {...field('email')}
                    type="email"
                    label={form.email.label}
                    placeholder={form.email.placeholder}
                    autoComplete="email"
                    required
                  />
                  <Input
                    {...field('phone')}
                    type="tel"
                    label={form.phone.label}
                    placeholder={form.phone.placeholder}
                    autoComplete="tel"
                  />
                </div>
                <Textarea
                  {...field('message')}
                  rows={4}
                  label={form.contactMessage.label}
                  placeholder={form.contactMessage.placeholder}
                />
                {status === 'error' && (
                  <p className={styles.error} role="alert">
                    {form.error}
                  </p>
                )}
                <Button type="submit" variant="accent" size="lg" block loading={status === 'submitting'}>
                  {status === 'submitting' ? form.submitting : copy.contact.submit}
                </Button>
              </form>
            )}

            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={styles.facebook}>
              {copy.contact.facebook}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

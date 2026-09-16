import { GraduationCap, Award } from 'lucide-react'

const education = [
  {
    degree: 'B.E., Mechanical Engineering',
    school: 'Nagesh Karajagi Orchid College of Engineering & Technology',
    period: '2014 — 2018',
  },
  {
    degree: '12th HSC',
    school: 'SR Chandak Junior College, Solapur',
    period: '2012 — 2014',
  },
  {
    degree: '10th SSC',
    school: 'Saint Joseph High School, Solapur',
    period: '2012',
  },
]

const certifications = [
  'Generative AI Cohort Certificate',
  '100x Mini Hackathon',
  'Simulink Onramp',
  'Matlab Onramp',
]

export default function EducationSection() {
  return (
    <section id="education" className="section education-section">
      <div className="page-width">
        <div className="section-heading"><h2>Education & <span>Credentials</span></h2></div>
        <div className="education-layout">
          <div>
            <h3 className="column-heading"><GraduationCap size={22} aria-hidden="true" />Education</h3>
            <div className="education-list">
              {education.map((edu) => (
                <article key={edu.degree}>
                  <span className="education-period">{edu.period}</span>
                  <h4>{edu.degree}</h4>
                  <p className="body-copy">{edu.school}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h3 className="column-heading"><Award size={22} aria-hidden="true" />Certifications</h3>
            <ul className="certification-list">
              {certifications.map((cert) => (
                <li key={cert}><Award size={16} aria-hidden="true" /><span>{cert}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

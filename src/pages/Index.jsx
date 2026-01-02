import { Helmet } from 'react-helmet-async';
import HomePage from './Page/HomePage';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';


const Index = () => {
  return (
    <>
      <Helmet>
        <title>SkillPORT - Where Skills Meet Opportunities | Job Portal</title>
        <meta 
          name="description" 
          content="SkillPORT is a smart skill-first hiring platform connecting Job Seekers, Freelancers, Recruiters & Companies with powerful matching and hiring tools." 
        />
        <meta name="keywords" content="job portal, skill matching, hire talent, find jobs, freelance, recruiters, career platform" />
        <link rel="canonical" href="https://skillport.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SkillPORT - Where Skills Meet Opportunities" />
        <meta property="og:description" content="A smart skill-first hiring platform connecting Job Seekers, Freelancers, Recruiters & Companies." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SkillPORT",
            "description": "Skill-first hiring platform for jobs, freelance projects, and talent acquisition",
            "url": "https://skillport.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://skillport.com/jobs?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <main>
          <HomePage />
          {/* <Login /> */}
          {/* <Register /> */}
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Index;

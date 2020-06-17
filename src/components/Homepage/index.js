import React from 'react'
import './styles.css'

const Homepage = ({setCountry}) =>
  <div className='homepage'>
    <img className='who-logo' src='images/who_logo.png' alt='WHO logo' />
    <section className='text-center'>
      <div className='container'>
        <h1>HIV Country Intelligence</h1>
        <h2>HIV Testing Services Dashboard</h2>
        <div className='input-group'>
          <select onChange={e => setCountry(e.target.value)} className='custom-select'>
            <option selected>Select Country</option>
            <option value='Kenya'>Kenya</option>
            <option value='Uganda'>Uganda</option>
            <option value='Nigeria'>Nigeria</option>
          </select>
        </div>
      </div>
    </section>
    <p className='text-muted'>
      Overview: The HTS dashboard brings together data on HIV testing services from various sources into one visual tool. We would like to acknowledge the support of the Ministries of Health of Member States, UNAIDS, the Bill and Melinda Gates Foundation, the President’s Emergency Programme for AIDS Relief (PEPFAR), USAID, the World Health Organization, and the Global Fund to Fight AIDS, Tuberculosis and Malaria. This project aims to provide local level data for in country action for policy-makers, programme directors, outreach workers and community activists among others. The most recent data available has been collected from the relevant organisation including UNAIDS (Spectrum estimates, Global AIDS Monitoring and the Key Population Atlas), UNPOP, UNICEF and the World Bank. USAID/PEPFAR have kindly provided HIV testing data by approach. Data gaps have been filled (where possible) by reviewing publicly available sources, most notably from Ministries of Health and PEPFAR country operational plans. All dashboards have been viewed and approved by the Ministries of Health.
    </p>
    <p className='text-muted'>
      Contact: Cheryl Case Johnson (johnsonc@who.int)
    </p>
    {/* <div className='home mt-5'>
      <div className='row'>
        <div className='col-12'>
          <h2 className='mb-3'>! hello !</h2>
        </div>
      </div>
    </div> */}
  </div>

export default Homepage
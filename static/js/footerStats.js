(function () {
  let xhrObject = new XMLHttpRequest();

  xhrObject.onreadystatechange = function() {
    if (xhrObject.readyState === 4) {
      if (xhrObject.status === 200 || xhrObject.status === 304) {
        let stats = JSON.parse(xhrObject.responseText)
        let {
          mArea,
          stat_area,
          stat_certified,
          stat_countries,
          stat_registered,
          stat_projects,
          stat_wellaps,
          stat_wellap_certified,
          stat_wellap_countries,
          stat_well_ap_registered,
          sqftArea
        } = stats

        if (!window.location.href.includes('zh-cn')) {
          let area = document.getElementById('area')
          let certified = document.getElementById('certified')
          let countries = document.getElementById('countries')
          let projects = document.getElementById('projects')
          let registered = document.getElementById('registered')
          let wellaps = document.getElementById('wellaps')
          let wellap_certified = document.getElementById('wellap_certified')
          let wellap_countries = document.getElementById('wellap_countries')
          let wellap_registered = document.getElementById('wellap_registered')

          if (area) { area.innerHTML = stat_area }
          if (certified) { certified.innerHTML = stat_certified }
          if (countries) { countries.innerHTML = stat_countries }
          if (projects) { projects.innerHTML = stat_projects }
          if (registered) { registered.innerHTML = stat_registered }
          if (wellaps) { wellaps.innerHTML = stat_wellaps }
          if (wellap_certified) { wellap_certified.innerHTML = stat_wellap_certified }
          if (wellap_countries) { wellap_countries.innerHTML = stat_wellap_countries }
          if (wellap_registered) { wellap_registered.innerHTML = stat_well_ap_registered }
        }

        else if (window.location.href.includes('zh-cn')) {
          let zhcn_area = document.getElementById('zhcn_area')
          let zhcn_certified = document.getElementById('zhcn_certified')
          let zhcn_countries = document.getElementById('zhcn_countries')
          let zhcn_projects = document.getElementById('zhcn_projects')
          let zhcn_registered = document.getElementById('zhcn_registered')
          let zhcn_wellaps = document.getElementById('zhcn_wellaps')
          let zhcn_wellap_certified = document.getElementById('zhcn_wellap_certified')
          let zhcn_wellap_countries = document.getElementById('zhcn_wellap_countries')
          let zhcn_wellap_registered = document.getElementById('zhcn_wellap_registered')

          if (zhcn_area) {
            sqftArea = stat_area.split(' ')[0]
            mArea = Math.floor((100 * sqftArea) / 10.764)
            zhcn_area.innerHTML = mArea
          }
          if (zhcn_certified) { zhcn_certified.innerHTML = stat_certified }
          if (zhcn_countries) { zhcn_countries.innerHTML = stat_countries }
          if (zhcn_projects) { zhcn_projects.innerHTML = stat_projects }
          if (zhcn_registered) { zhcn_registered.innerHTML = stat_registered }
          if (zhcn_wellaps) { zhcn_wellaps.innerHTML = stat_wellaps }
          if (zhcn_wellap_certified) { zhcn_wellap_certified.innerHTML = stat_wellap_certified }
          if (zhcn_wellap_countries) { zhcn_wellap_countries.innerHTLM = stat_wellap_countries }
          if (zhcn_wellap_registered) { zhcn_wellap_registered.innerHTML = stat_well_ap_registered }
        }
      }
    }
  }
  xhrObject.open(
    "GET",
    "https://v2-api.wellcertified.com/api/well/footer-stats",
    true
  );
  xhrObject.send();
})()
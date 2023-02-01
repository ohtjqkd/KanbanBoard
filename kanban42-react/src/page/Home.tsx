import DashBoard from '../component/DashBoard';
import Navigator from '../component/Navigator';

export default function Home() {
  console.log('home rending time', Date.now().toString());

  return (
    <div id="home">
      <main id='popover-boundary'>
        <div className="main-container">
          <Navigator />
          <DashBoard />
        </div>
      </main>
    </div>
  )
}
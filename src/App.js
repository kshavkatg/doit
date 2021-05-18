import { Content } from "./components/layout/Content"
import { Header } from "./components/layout/Header"
import { ProjectsProvider } from './context'

export const App = () => {
  return (
    <ProjectsProvider>
      <div className="App">
        <Header />
        <Content />
      </div>
    </ProjectsProvider>
  );
}


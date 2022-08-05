// @flow strict
import { type Node } from 'react';
import { Flex, Heading, Link, Text } from 'gestalt';
import Card from '../../../docs-components/Card.js';
import Markdown from '../../../docs-components/Markdown.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Page from '../../../docs-components/Page.js';
import MainSection from '../../../docs-components/MainSection.js';

export default function ContainerPage(): Node {
  return (
    <Page title="Development process">
      <PageHeader name="Development process" type="guidelines" />
      <Card name="Set up your laptop">
        <Flex alignItems="start" direction="column" gap={4}>
          <ul>
            <li>
              <Text>
                Install a code editor - we recommend{' '}
                <Link href="https://code.visualstudio.com/download" inline target="blank">
                  <Text weight="bold">VS Code</Text>
                </Link>
              </Text>
            </li>
            <li>
              <Text weight="bold">
                <Link href="https://github.com/creationix/nvm#install-script" target="blank">
                  Install nvm
                </Link>
              </Text>
            </li>
            <li>
              <Text weight="bold">
                <Link href="https://github.com/nvm-sh/nvm#usage" target="blank">
                  Install node
                </Link>
              </Text>
            </li>
            <li>
              <Text weight="bold">
                <Link href="https://classic.yarnpkg.com/en/docs/install" target="blank">
                  Install yarn
                </Link>
              </Text>
            </li>
            <li>
              <Text weight="bold" inline>
                <Link inline href="https://docs.docker.com/get-docker/" target="blank">
                  Install Docker desktop.
                </Link>{' '}
                <Text inline>
                  You can also run the following command: <code>brew install --cask docker</code>
                </Text>
              </Text>
            </li>
          </ul>
        </Flex>
      </Card>
      <Card name="Set up your Gestalt repository">
        <Flex alignItems="start" direction="column" gap={4}>
          <ul>
            <li>
              <Text>
                Clone the repo: Fork the Gestalt repo and work off your forked repo, not the{' '}
                <code>pinterest/gestalt</code> repo.
              </Text>
            </li>
            <li>
              <Text>
                Once forked, clone to your local machine using the <code>SSH</code> option.
              </Text>
              <Markdown
                text="
~~~bash
git clone git@github.com:<YOUR_USERNAME>/gestalt.git
~~~"
              />
            </li>
            <li>
              <Text>Use the correct Node.js version to setup the environment locally.</Text>
              <Markdown
                text="
~~~bash
cd gestalt && nvm use
~~~"
              />
              <Text>
                If the node version isn&apos;t available, you will need to{' '}
                <Link href="https://github.com/nvm-sh/nvm#usage" inline target="blank">
                  <Text weight="bold">install it</Text>
                </Link>
                .
              </Text>
            </li>
          </ul>

          <ul>
            <li>
              <Text>
                Install project dependencies. Do not run <code>npm install</code> because it will
                create a <code>package-lock.json</code> file (and also takes considerably longer).
              </Text>
              <Markdown
                text="
~~~bash
yarn
~~~"
              />
            </li>
            <li>
              <Text>
                Add <code>pinterest/gestalt</code> as a remote upstream (you&apos;ll only need to do
                this once).
              </Text>
              <Markdown
                text="
~~~bash
git remote add upstream git@github.com:pinterest/gestalt.git
~~~"
              />
            </li>
            <li>
              <Text>Check your remote configuration.</Text>
              <Markdown
                text="
~~~bash
git remote -v
// origin    git@github.com:<YOUR_USERNAME>/gestalt.git (fetch)
// origin    git@github.com:<YOUR_USERNAME>/gestalt.git (push)
// upstream    git@github.com:pinterest/gestalt.git (fetch)
// upstream    git@github.com:pinterest/gestalt.git (push)
~~~"
              />
            </li>
          </ul>
        </Flex>
      </Card>
      <Card name="Set up Visual Studio Code">
        <Flex alignItems="start" direction="column" gap={4}>
          <ul>
            <li>
              <Text>
                Open the new <code>/gestalt</code> folder with VS Code.
              </Text>
            </li>
            <li>
              <Text>
                Install the suggested VS Code extensions including <code>vs code-stylelint</code> to
                lint CSS files.
              </Text>
            </li>
            <li>
              <Text>If you want to automatically launch the docs when you open VS Code:</Text>
              <ul>
                <li>
                  <Text>
                    In VS Code type <code>CMD+Shift+p</code>
                  </Text>
                </li>
                <li>
                  <Text>Search and select Tasks: &quot;Manage Automatic Tasks in Folder&quot;</Text>
                </li>
                <li>
                  <Text>Select Allow &quot;Automatic Tasks in Folder&quot;</Text>
                </li>
                <li>
                  <Text>Relaunch VS Code</Text>
                </li>
              </ul>
            </li>
          </ul>
        </Flex>
      </Card>
      <Card name="Run the Gestalt documentation server">
        <Flex alignItems="start" direction="column" gap={4}>
          <Text>
            Whenever you make changes to Gestalt, please test them out locally before making a PR.
          </Text>
          <Text>
            To start the documentation server, run <code>yarn start</code>, which will automatically
            open the docs in a new browser tab. If for some reason that tab doesn&apos;t launch,
            navigate to{' '}
            <Link inline href="http://localhost:8888" target="blank">
              http://localhost:8888
            </Link>
            .
          </Text>
        </Flex>
      </Card>
      <Card name="Use local Gestalt CSS &amp; JS">
        <Flex alignItems="start" direction="column" gap={4}>
          <Text>
            By default we use the latest published version of Gestalt&apos;s CSS and JS for Sandpack
            examples. If you want to use the local Gestalt CSS &amp; JS, append{' '}
            <code>localFiles=true</code> to the URL:
          </Text>
          <Markdown
            text="
~~~bash
http://localhost:8888/modal?localFiles=true
~~~"
          />
        </Flex>
      </Card>
      <Card name="Create a pull request">
        <Flex alignItems="start" direction="column" gap={4}>
          <ul>
            <li>
              <Text>Rebase your local master branch.</Text>
              <Markdown
                text="
~~~bash
git fetch upstream
git rebase upstream/master
~~~"
              />
            </li>
            <li>
              <Text>
                Create and checkout a branch. Replace the text <code>&lt;feature-branch&gt;</code>{' '}
                with your branch name.
              </Text>
              <Markdown
                text="
~~~bash
git checkout -b <feature-branch> upstream/master
~~~"
              />
            </li>
            <li>
              <Text inline>Time to make changes to Gestalt! </Text>
              <Text inline>
                If you are introducing a new component, run the scaffolding command to generate the
                necessary files. Replace &lsquo;ComponentName&lsquo; with the name of your
                component.
                <Markdown
                  text="
~~~bash
yarn generate ComponentName
~~~"
                />
              </Text>
            </li>
            <li>
              <Text inline>
                Any subsequent component changes might require the following actions.
              </Text>
              <ul>
                <li>
                  <Text>Run unit tests</Text>
                  <Markdown
                    text="
~~~bash
yarn jest -u
~~~"
                  />
                </li>
                <li>
                  <Text>
                    Run{' '}
                    <Link href="https://www.npmjs.com/package/@axe-core/playwright" inline>
                      <Text weight="bold">Playwright accessibility integration tests</Text>
                    </Link>
                    . If any documentation examples are expected to fail accessibility testing, wrap
                    the example in a container with <code>data-skip-accessibility-check</code>.
                  </Text>
                  <Markdown
                    text="
~~~bash
yarn playwright:test accessibility/
~~~"
                  />
                </li>
                <li>
                  <Text>
                    Run{' '}
                    <Link href="https://playwright.dev/docs/test-snapshots" inline>
                      <Text weight="bold">Playwright visual diff snapshot tests</Text>
                    </Link>
                    . If any component changes are expected to visually modify your component, you
                    must update the snapshot tests. In order to update the Linux snapshots in the
                    tests, you must build a docker file and then run docker.
                  </Text>
                  <Markdown
                    text="
~~~bash
# Start the documentation server (required for updating macOS snapshots)
yarn start
#
# Update macOS snapshots
yarn playwright:test visual-test/ --update-snapshots
~~~"
                  />
                  <Markdown
                    text="
~~~bash
# Build the docker container (only need to do this once)
yarn docker:build
#
# Update the linux snapshots
yarn docker:run
~~~"
                  />
                </li>
                <li>
                  <Text>Update CSS flow types.</Text>
                  <Markdown
                    text="
~~~bash
yarn run flow-generate:css
~~~"
                  />
                </li>
                <li>
                  <Text>
                    If you are introducing breaking changes, create a{' '}
                    <Link href="/releases#Codemods" inline>
                      <Text weight="bold">codemod</Text>
                    </Link>{' '}
                    to help users migrate between versions.
                  </Text>
                </li>
              </ul>
            </li>

            <li>
              <Text>
                Commit the changes to your branch. Follow naming conventions for the PR:{' '}
                <code>&lt;Component&gt;: &lt;Commit Change Description&gt;</code>. Follow these
                steps again for any additional updates to your branch. When you are done, push your
                branch up.
              </Text>
              <Markdown
                text='
~~~bash
git add .
git commit -am "Component: Commit Change Description"
git push -f origin HEAD
~~~'
              />
            </li>
            <li>
              <Text>
                Go to{' '}
                <Link inline href="https://github.com/pinterest/gestalt" target="blank">
                  <Text weight="bold">https://github.com/pinterest/gestalt</Text>
                </Link>
                . A new banner will be displayed, click on &apos;Compare &amp; Create Pull
                Request&apos;.
              </Text>
            </li>
            <li>
              <Text>
                Add useful summary and screenshots. We provide a template for the summary to make
                sure you include all necessary information.
              </Text>
            </li>
            <li>
              <Text>
                Click on <code>Create Draft Pull Request</code> to create your PR. Once you are done
                committing changes to it, and all the CI tests have passed, click the &quot;Ready
                for Review&quot; button. (Keeping the PR as a draft until it is ready for review
                reduces the number of unneeded notifications for maintainers.) If you are a
                Pinterest employee, please let us know on Slack (#gestalt-web) that your PR is ready
                for review.
              </Text>
            </li>
            <li>
              <Text>
                Ensure checks pass on your Pull Request - having the &quot;Require Semver&nbsp;/
                Test (pull_request)&quot; check fail is expected, because a Gestalt maintainer needs
                to add a correct semver label. Check out our{' '}
                <Link href="#versioning" inline>
                  <Text weight="bold">versioning guidelines</Text>
                </Link>{' '}
                for more info.
              </Text>
            </li>
            <li>
              <Text>
                After a Gestalt maintainer adds a correct semver label and approves a Pull Request,
                the PR will be ready to merge. Coordinate with the reviewer to determine when the PR
                should be merged.
              </Text>
            </li>
          </ul>
          <Heading size="400">
            My pull request fails on &quot;Semver / Require Label (pull_request)&quot;, how do I fix
            it?
          </Heading>
          <Text>Nothing you can do to fix it.</Text>
          <Text>
            A Gestalt Core maintainer will add a semver label (patch release / minor release / major
            release) when reviewing a PR.
          </Text>
        </Flex>
      </Card>
      <Card name="Guidelines">
        <Flex alignItems="start" direction="column" gap={4}>
          <Heading size="400">Scope of work</Heading>

          <Text>
            When pushing new changes to GitHub, your PR title should be aligned with the scope of
            your work. If your goal was to change the default color of a component, keep the scope
            of changes to that specific task and word the title to exactly reflect those changes.
          </Text>

          <Heading size="400">Changes not allowed</Heading>
          <Text>Do not use the following CSS style properties:</Text>

          <ul>
            <li>
              <Text>
                <code>line-height</code>: Property in CSS that controls the space between lines of
                text. Not defining a <code>line-height</code> allows the browser to determine
                line-height based on language which prevents localization issues.
              </Text>
            </li>

            <li>
              <Text>
                <code>height</code>/<code>width</code>: Height &amp; width are CSS properties that
                can be used for determining the size of static assets such as an icon size. However,
                components that contain text data should not fix the height &amp; width of the
                component to prevent incorrect styling under different cases such as localization,
                longer texts, etc. Consider other alternatives such as padding to define different
                component sizes.
              </Text>
            </li>
          </ul>

          <Text>Avoid:</Text>

          <ul>
            <li>
              <Text>
                Boolean props: For example, instead of <code>isRTL: boolean</code> or{' '}
                <code>isStart: boolean</code> or <code>isEnd: boolean</code>, use more declarative
                props such as <code>layoutDirection: rtl | ltr</code> or{' '}
                <code>role: startInput | endInput</code>.
              </Text>
            </li>
          </ul>
        </Flex>
      </Card>
      <MainSection name="RFCs">
        <MainSection.Subsection description="Find the RFCs (request for comments) process and repository [here](https://github.com/pinterest/gestalt/tree/master/rfcs)." />
      </MainSection>
    </Page>
  );
}
import { IconButton, Tooltip } from '@radix-ui/themes';
import styles from './Bookmark.module.css';
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  EnvelopeClosedIcon,
} from '@radix-ui/react-icons';

const Bookmark = () => {
  return (
    <div className={styles.bookmark}>
      <div className={styles.credits}>
        <div className={styles.contact}>
          <Tooltip content="LinkedIn">
            <IconButton color="gray" asChild variant="soft" highContrast>
              <a
                href="https://www.linkedin.com/in/alinenaoe/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInLogoIcon width="18" height="18" />
              </a>
            </IconButton>
          </Tooltip>

          <Tooltip content="Github">
            <IconButton color="gray" asChild variant="soft" highContrast>
              <a
                href="https://github.com/alinenaoe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubLogoIcon width="18" height="18" />
              </a>
            </IconButton>
          </Tooltip>

          <Tooltip content="E-mail">
            <IconButton color="gray" asChild variant="soft" highContrast>
              <a
                href="mailto:alinenaoe@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <EnvelopeClosedIcon width="18" height="18" />
              </a>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;

import React from 'react';
import EmojiConvertor from 'emoji-js';
import EmojiData from './emojiDataLib';
import { classes } from './styles';

const emojiConvertor = new EmojiConvertor();
emojiConvertor.init_env();

const EmojiPicker = ({ onPicked, filter }) => (
  <div className={classes.emojiPicker}>
    {EmojiData.map((category, i) => {
      const filteredEmojis = category.emojis.filter(({ name }) =>
        name.includes(filter),
      );
      return (
        <div
          key={i}
          style={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
          }}>
          {filteredEmojis.length > 0 && (
            <div className={classes.emojiPickerCategoryTitle}>
              {category.name}
            </div>
          )}
          <div className={classes.emojiPickerCategory}>
            {filteredEmojis.map(({ char, _name }) => {
              return (
                <span
                  key={char}
                  className={classes.emojiPickerEmoji}
                  onClick={() => onPicked(char)}>
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
);

export default EmojiPicker;

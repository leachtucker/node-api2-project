import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

function Post({ post }) {
    return (
        <Accordion>
            <AccordionSummary
            expandIcon={"+"}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <Typography>{post.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {post.contents}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default Post;

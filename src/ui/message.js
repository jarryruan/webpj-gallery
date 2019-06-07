const React = require('react');

window.fa = require('./css/font-awesome-4.7.0/css/font-awesome.min.css');
window.message = {};
window.message.id = -1;
window.message.ButterToast = require('butter-toast').default;
window.message.Cinnamon = require('butter-toast').Cinnamon;
window.message.POS_CENTER = require('butter-toast').POS_CENTER;
window.message.POS_TOP = require('butter-toast').POS_TOP;
window.message.error = (message) => {
    window.message.ButterToast.dismiss(window.message.id);
    window.message.id = window.message.ButterToast.raise({
        content: <window.message.Cinnamon.Crunch scheme={window.message.Cinnamon.Crunch.SCHEME_RED}
                                                 content={() => <div>{message}</div>}
                                                 title="Error"
                                                 icon={() => <i className={`${window.fa['fa']} ${window.fa['fa-3x']} ${window.fa['fa-times']}`} />} />
    });
};
window.message.success = (message) => {
    window.message.ButterToast.dismiss(window.message.id);
    window.message.id = window.message.ButterToast.raise({
        content: <window.message.Cinnamon.Crunch scheme={window.message.Cinnamon.Crunch.SCHEME_GREEN}
                                                 content={() => <div>{message}</div>}
                                                 title="Success"
                                                 icon={() => <i className={`${window.fa['fa']} ${window.fa['fa-3x']} ${window.fa['fa-check']}`} />} />
    });
};
import styled, { css } from 'styled-components';
import flag from './flags.png';

const getFlagPosition = (country) => {
    switch (country) {
        case 'ad':
            return { backgroundPosition: '-16px 0' };
        case 'ae':
            return { backgroundPosition: '-32px 0' };
        case 'af':
            return { backgroundPosition: '-48px 0' };
        case 'ag':
            return { backgroundPosition: '-64px 0' };
        case 'ai':
            return { backgroundPosition: '-80px 0' };
        case 'al':
            return { backgroundPosition: '-96px 0' };
        case 'am':
            return { backgroundPosition: '-112px 0' };
        case 'ao':
            return { backgroundPosition: '-128px 0' };
        case 'ar':
            return { backgroundPosition: '-144px 0' };
        case 'as':
            return { backgroundPosition: '-160px 0' };
        case 'at':
            return { backgroundPosition: '-176px 0' };
        case 'au':
            return { backgroundPosition: '-192px 0' };
        case 'aw':
            return { backgroundPosition: '-208px 0' };
        case 'az':
            return { backgroundPosition: '-224px 0' };
        case 'ba':
            return { backgroundPosition: '-240px 0' };
        case 'bb':
            return { backgroundPosition: '0 -11px' };
        case 'bd':
            return { backgroundPosition: '-16px -11px' };
        case 'be':
            return { backgroundPosition: '-32px -11px' };
        case 'bf':
            return { backgroundPosition: '-48px -11px' };
        case 'bg':
            return { backgroundPosition: '-64px -11px' };
        case 'bh':
            return { backgroundPosition: '-80px -11px' };
        case 'bi':
            return { backgroundPosition: '-96px -11px' };
        case 'bj':
            return { backgroundPosition: '-112px -11px' };
        case 'bm':
            return { backgroundPosition: '-128px -11px' };
        case 'bn':
            return { backgroundPosition: '-144px -11px' };
        case 'bo':
            return { backgroundPosition: '-160px -11px' };
        case 'br':
            return { backgroundPosition: '-176px -11px' };
        case 'bs':
            return { backgroundPosition: '-192px -11px' };
        case 'bt':
            return { backgroundPosition: '-208px -11px' };
        case 'bw':
            return { backgroundPosition: '-224px -11px' };
        case 'by':
            return { backgroundPosition: '-240px -11px' };
        case 'bz':
            return { backgroundPosition: '0 -22px' };
        case 'ca':
            return { backgroundPosition: '-16px -22px' };
        case 'cd':
            return { backgroundPosition: '-32px -22px' };
        case 'cf':
            return { backgroundPosition: '-48px -22px' };
        case 'cg':
            return { backgroundPosition: '-64px -22px' };
        case 'ch':
            return { backgroundPosition: '-80px -22px' };
        case 'ci':
            return { backgroundPosition: '-96px -22px' };
        case 'ck':
            return { backgroundPosition: '-112px -22px' };
        case 'cl':
            return { backgroundPosition: '-128px -22px' };
        case 'cm':
            return { backgroundPosition: '-144px -22px' };
        case 'cn':
            return { backgroundPosition: '-160px -22px' };
        case 'co':
            return { backgroundPosition: '-176px -22px' };
        case 'cr':
            return { backgroundPosition: '-192px -22px' };
        case 'cu':
            return { backgroundPosition: '-208px -22px' };
        case 'cv':
            return { backgroundPosition: '-224px -22px' };
        case 'cw':
            return { backgroundPosition: '-240px -22px' };
        case 'cy':
            return { backgroundPosition: '0 -33px' };
        case 'cz':
            return { backgroundPosition: '-16px -33px' };
        case 'de':
            return { backgroundPosition: '-32px -33px' };
        case 'dj':
            return { backgroundPosition: '-48px -33px' };
        case 'dk':
            return { backgroundPosition: '-64px -33px' };
        case 'dm':
            return { backgroundPosition: '-80px -33px' };
        case 'do':
            return { backgroundPosition: '-96px -33px' };
        case 'dz':
            return { backgroundPosition: '-112px -33px' };
        case 'ec':
            return { backgroundPosition: '-128px -33px' };
        case 'ee':
            return { backgroundPosition: '-144px -33px' };
        case 'eg':
            return { backgroundPosition: '-160px -33px' };
        case 'er':
            return { backgroundPosition: '-176px -33px' };
        case 'es':
            return { backgroundPosition: '-192px -33px' };
        case 'et':
            return { backgroundPosition: '-208px -33px' };
        case 'fi':
            return { backgroundPosition: '-224px -33px' };
        case 'fj':
            return { backgroundPosition: '-240px -33px' };
        case 'fk':
            return { backgroundPosition: '0 -44px' };
        case 'fm':
            return { backgroundPosition: '-16px -44px' };
        case 'fo':
            return { backgroundPosition: '-32px -44px' };
        case 'fr':
        case 'bl':
        case 'mf':
            return { backgroundPosition: '-48px -44px' };
        case 'ga':
            return { backgroundPosition: '-64px -44px' };
        case 'gb':
            return { backgroundPosition: '-80px -44px' };
        case 'gd':
            return { backgroundPosition: '-96px -44px' };
        case 'ge':
            return { backgroundPosition: '-112px -44px' };
        case 'gf':
            return { backgroundPosition: '-128px -44px' };
        case 'gh':
            return { backgroundPosition: '-144px -44px' };
        case 'gi':
            return { backgroundPosition: '-160px -44px' };
        case 'gl':
            return { backgroundPosition: '-176px -44px' };
        case 'gm':
            return { backgroundPosition: '-192px -44px' };
        case 'gn':
            return { backgroundPosition: '-208px -44px' };
        case 'gp':
            return { backgroundPosition: '-224px -44px' };
        case 'gq':
            return { backgroundPosition: '-240px -44px' };
        case 'gr':
            return { backgroundPosition: '0 -55px' };
        case 'gt':
            return { backgroundPosition: '-16px -55px' };
        case 'gu':
            return { backgroundPosition: '-32px -55px' };
        case 'gw':
            return { backgroundPosition: '-48px -55px' };
        case 'gy':
            return { backgroundPosition: '-64px -55px' };
        case 'hk':
            return { backgroundPosition: '-80px -55px' };
        case 'hn':
            return { backgroundPosition: '-96px -55px' };
        case 'hr':
            return { backgroundPosition: '-112px -55px' };
        case 'ht':
            return { backgroundPosition: '-128px -55px' };
        case 'hu':
            return { backgroundPosition: '-144px -55px' };
        case 'id':
            return { backgroundPosition: '-160px -55px' };
        case 'ie':
            return { backgroundPosition: '-176px -55px' };
        case 'il':
            return { backgroundPosition: '-192px -55px' };
        case 'in':
            return { backgroundPosition: '-208px -55px' };
        case 'io':
            return { backgroundPosition: '-224px -55px' };
        case 'iq':
            return { backgroundPosition: '-240px -55px' };
        case 'ir':
            return { backgroundPosition: '0 -66px' };
        case 'is':
            return { backgroundPosition: '-16px -66px' };
        case 'it':
            return { backgroundPosition: '-32px -66px' };
        case 'jm':
            return { backgroundPosition: '-48px -66px' };
        case 'jo':
            return { backgroundPosition: '-64px -66px' };
        case 'jp':
            return { backgroundPosition: '-80px -66px' };
        case 'ke':
            return { backgroundPosition: '-96px -66px' };
        case 'kg':
            return { backgroundPosition: '-112px -66px' };
        case 'kh':
            return { backgroundPosition: '-128px -66px' };
        case 'ki':
            return { backgroundPosition: '-144px -66px' };
        case 'km':
            return { backgroundPosition: '-160px -66px' };
        case 'kn':
            return { backgroundPosition: '-176px -66px' };
        case 'kp':
            return { backgroundPosition: '-192px -66px' };
        case 'kr':
            return { backgroundPosition: '-208px -66px' };
        case 'kw':
            return { backgroundPosition: '-224px -66px' };
        case 'ky':
            return { backgroundPosition: '-240px -66px' };
        case 'kz':
            return { backgroundPosition: '0 -77px' };
        case 'la':
            return { backgroundPosition: '-16px -77px' };
        case 'lb':
            return { backgroundPosition: '-32px -77px' };
        case 'lc':
            return { backgroundPosition: '-48px -77px' };
        case 'li':
            return { backgroundPosition: '-64px -77px' };
        case 'lk':
            return { backgroundPosition: '-80px -77px' };
        case 'lr':
            return { backgroundPosition: '-96px -77px' };
        case 'ls':
            return { backgroundPosition: '-112px -77px' };
        case 'lt':
            return { backgroundPosition: '-128px -77px' };
        case 'lu':
            return { backgroundPosition: '-144px -77px' };
        case 'lv':
            return { backgroundPosition: '-160px -77px' };
        case 'ly':
            return { backgroundPosition: '-176px -77px' };
        case 'ma':
            return { backgroundPosition: '-192px -77px' };
        case 'mc':
            return { backgroundPosition: '-208px -77px' };
        case 'md':
            return { backgroundPosition: '-224px -77px' };
        case 'me':
            return { backgroundPosition: '-112px -154px', height: '12px' };
        case 'mg':
            return { backgroundPosition: '0 -88px' };
        case 'mh':
            return { backgroundPosition: '-16px -88px' };
        case 'mk':
            return { backgroundPosition: '-32px -88px' };
        case 'ml':
            return { backgroundPosition: '-48px -88px' };
        case 'mm':
            return { backgroundPosition: '-64px -88px' };
        case 'mn':
            return { backgroundPosition: '-80px -88px' };
        case 'mo':
            return { backgroundPosition: '-96px -88px' };
        case 'mp':
            return { backgroundPosition: '-112px -88px' };
        case 'mq':
            return { backgroundPosition: '-128px -88px' };
        case 'mr':
            return { backgroundPosition: '-144px -88px' };
        case 'ms':
            return { backgroundPosition: '-160px -88px' };
        case 'mt':
            return { backgroundPosition: '-176px -88px' };
        case 'mu':
            return { backgroundPosition: '-192px -88px' };
        case 'mv':
            return { backgroundPosition: '-208px -88px' };
        case 'mw':
            return { backgroundPosition: '-224px -88px' };
        case 'mx':
            return { backgroundPosition: '-240px -88px' };
        case 'my':
            return { backgroundPosition: '0 -99px' };
        case 'mz':
            return { backgroundPosition: '-16px -99px' };
        case 'na':
            return { backgroundPosition: '-32px -99px' };
        case 'nc':
            return { backgroundPosition: '-48px -99px' };
        case 'ne':
            return { backgroundPosition: '-64px -99px' };
        case 'nf':
            return { backgroundPosition: '-80px -99px' };
        case 'ng':
            return { backgroundPosition: '-96px -99px' };
        case 'ni':
            return { backgroundPosition: '-112px -99px' };
        case 'nl':
        case 'bq':
            return { backgroundPosition: '-128px -99px' };
        case 'no':
            return { backgroundPosition: '-144px -99px' };
        case 'np':
            return { backgroundPosition: '-160px -99px' };
        case 'nr':
            return { backgroundPosition: '-176px -99px' };
        case 'nu':
            return { backgroundPosition: '-192px -99px' };
        case 'nz':
            return { backgroundPosition: '-208px -99px' };
        case 'om':
            return { backgroundPosition: '-224px -99px' };
        case 'pa':
            return { backgroundPosition: '-240px -99px' };
        case 'pe':
            return { backgroundPosition: '0 -110px' };
        case 'pf':
            return { backgroundPosition: '-16px -110px' };
        case 'pg':
            return { backgroundPosition: '-32px -110px' };
        case 'ph':
            return { backgroundPosition: '-48px -110px' };
        case 'pk':
            return { backgroundPosition: '-64px -110px' };
        case 'pl':
            return { backgroundPosition: '-80px -110px' };
        case 'pm':
            return { backgroundPosition: '-96px -110px' };
        case 'pr':
            return { backgroundPosition: '-112px -110px' };
        case 'ps':
            return { backgroundPosition: '-128px -110px' };
        case 'pt':
            return { backgroundPosition: '-144px -110px' };
        case 'pw':
            return { backgroundPosition: '-160px -110px' };
        case 'py':
            return { backgroundPosition: '-176px -110px' };
        case 'qa':
            return { backgroundPosition: '-192px -110px' };
        case 're':
            return { backgroundPosition: '-208px -110px' };
        case 'ro':
            return { backgroundPosition: '-224px -110px' };
        case 'rs':
            return { backgroundPosition: '-240px -110px' };
        case 'ru':
            return { backgroundPosition: '0 -121px' };
        case 'rw':
            return { backgroundPosition: '-16px -121px' };
        case 'sa':
            return { backgroundPosition: '-32px -121px' };
        case 'sb':
            return { backgroundPosition: '-48px -121px' };
        case 'sc':
            return { backgroundPosition: '-64px -121px' };
        case 'sd':
            return { backgroundPosition: '-80px -121px' };
        case 'se':
            return { backgroundPosition: '-96px -121px' };
        case 'sg':
            return { backgroundPosition: '-112px -121px' };
        case 'sh':
            return { backgroundPosition: '-128px -121px' };
        case 'si':
            return { backgroundPosition: '-144px -121px' };
        case 'sk':
            return { backgroundPosition: '-160px -121px' };
        case 'sl':
            return { backgroundPosition: '-176px -121px' };
        case 'sm':
            return { backgroundPosition: '-192px -121px' };
        case 'sn':
            return { backgroundPosition: '-208px -121px' };
        case 'so':
            return { backgroundPosition: '-224px -121px' };
        case 'sr':
            return { backgroundPosition: '-240px -121px' };
        case 'ss':
            return { backgroundPosition: '0 -132px' };
        case 'st':
            return { backgroundPosition: '-16px -132px' };
        case 'sv':
            return { backgroundPosition: '-32px -132px' };
        case 'sx':
            return { backgroundPosition: '-48px -132px' };
        case 'sy':
            return { backgroundPosition: '-64px -132px' };
        case 'sz':
            return { backgroundPosition: '-80px -132px' };
        case 'tc':
            return { backgroundPosition: '-96px -132px' };
        case 'td':
            return { backgroundPosition: '-112px -132px' };
        case 'tg':
            return { backgroundPosition: '-128px -132px' };
        case 'th':
            return { backgroundPosition: '-144px -132px' };
        case 'tj':
            return { backgroundPosition: '-160px -132px' };
        case 'tk':
            return { backgroundPosition: '-176px -132px' };
        case 'tl':
            return { backgroundPosition: '-192px -132px' };
        case 'tm':
            return { backgroundPosition: '-208px -132px' };
        case 'tn':
            return { backgroundPosition: '-224px -132px' };
        case 'to':
            return { backgroundPosition: '-240px -132px' };
        case 'tr':
            return { backgroundPosition: '0 -143px' };
        case 'tt':
            return { backgroundPosition: '-16px -143px' };
        case 'tv':
            return { backgroundPosition: '-32px -143px' };
        case 'tw':
            return { backgroundPosition: '-48px -143px' };
        case 'tz':
            return { backgroundPosition: '-64px -143px' };
        case 'ua':
            return { backgroundPosition: '-80px -143px' };
        case 'ug':
            return { backgroundPosition: '-96px -143px' };
        case 'us':
            return { backgroundPosition: '-112px -143px' };
        case 'uy':
            return { backgroundPosition: '-128px -143px' };
        case 'uz':
            return { backgroundPosition: '-144px -143px' };
        case 'va':
            return { backgroundPosition: '-160px -143px' };
        case 'vc':
            return { backgroundPosition: '-176px -143px' };
        case 've':
            return { backgroundPosition: '-192px -143px' };
        case 'vg':
            return { backgroundPosition: '-208px -143px' };
        case 'vi':
            return { backgroundPosition: '-224px -143px' };
        case 'vn':
            return { backgroundPosition: '-240px -143px' };
        case 'vu':
            return { backgroundPosition: '0 -154px' };
        case 'wf':
            return { backgroundPosition: '-16px -154px' };
        case 'ws':
            return { backgroundPosition: '-32px -154px' };
        case 'ye':
            return { backgroundPosition: '-48px -154px' };
        case 'za':
            return { backgroundPosition: '-64px -154px' };
        case 'zm':
            return { backgroundPosition: '-80px -154px' };
        case 'zw':
            return { backgroundPosition: '-96px -154px' };
    }
};

export const Container = styled.div`
    position: relative;
    display: block;

    &:disabled {
        cursor: not-allowed;
    }

    input[type='text'],
    input[type='tel'] {
        padding-left: 36px;
    }
`;

export const Flag = styled.div.attrs(
    ({ countryCode }) =>
        countryCode && {
            style: getFlagPosition(countryCode),
        },
)`
    width: 16px;
    height: 11px;
    background: url(${flag});
    ${({ countryList }) =>
        countryList &&
        css`
            display: inline-block;
            margin-right: 6px;
            margin-top: 2px;
        `}
    ${({ selected }) =>
        selected &&
        css`
            position: absolute;
            top: 50%;
            margin-top: -7px;
        `}
`;

export const SelectedFlag = styled.div`
    z-index: 13;
    position: relative;
    width: 38px;
    height: 100%;
`;

export const FlagContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    padding: 0;
    ${({ error }) =>
        error &&
        css`
            margin-bottom: 1em;
        `}
    &:hover {
        cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
        ${SelectedFlag} {
            background-color: transparent;
        }
    }
`;

export const Arrow = styled.div`
    position: relative;
    top: 50%;
    margin-top: -2px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid #555;
    ${({ up }) =>
        up &&
        css`
            border-top: none;
            border-bottom: 4px solid #555;
        `}
`;

export const CountryListWrapper = styled.div`
    display: block;
    width: 100%;
    position: absolute;
    margin: 10px 10px 10px -1px;
`;

export const CountryList = styled.ul`
    list-style: none;
    position: absolute;
    z-index: 15;
    padding: 0;
    margin: 10px 0 10px -1px;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.35);
    background-color: white;
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
    border-radius: 0 0 3px 3px;
    display: inline-block;

    ${({ hide }) =>
        hide &&
        css`
            display: none;
        `}
`;

export const Divider = styled.li`
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
`;

export const Country = styled.li`
    cursor: pointer;
    padding: 7px 10px;
    ${({ highlight }) =>
        highlight &&
        css`
            background-color: #e8e8e8;
        `}
    &:hover {
        background-color: #f1f1f1;
    }
`;

export const CountryName = styled.span`
    margin-right: 6px;
`;

export const DialCode = styled.span`
    color: #6b6b6b;
`;

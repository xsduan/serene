# overview

|    31…30   |  29…27 | 26…20 |  29…15 |   14…12   |    11…10   |   9…5  |   4…2   |   1…0  |
|------------|--------|-------|--------|-----------|------------|--------|---------|--------|
| phone type | unused | flags | manner | laryngeal | pharyngeal | dorsal | coronal | labial |

# phone type

`00 = pulmonic consonant`
`01 = non-pulmonic and other consonants`
`10 = vowel`
`11 = extIPA`

# flags

Are we specifying…

|    26   |     25     |      24     |    23   |    22    |    21   |   20   |
|---------|------------|-------------|---------|----------|---------|--------|
| manner? | laryngeal? | pharyngeal? | dorsal? | coronal? | labial? | class? |

`1 = ambiguous`
`0 = specified`

# features

`1 = present`
`0 = absent`
`X = don't care`

## manner

|     19     |    18    |    17   |    16   |   15  |
|------------|----------|---------|---------|-------|
| continuant | strident | lateral | del rel | nasal |

## laryngeal

|   14  | 13 | 12 |
|-------|----|----|
| voice | sg | cg |

## pharyngeal

|     11     |  10 |
|------------|-----|
| pharyngeal | ATR |

`bitfield: 0X`

## dorsal

|   9    |   8  |  7  |   6  |   5   |
|--------|------|-----|------|-------|
| dorsal | high | low | back | tense |

`bitfield: 0XXXX`

## coronal

|    4    |     3    |    2   |
|---------|----------|--------|
| coronal | anterior | distal |

`bitfield: 0XX`

## labial

|    1   |   0   |
|--------|-------|
| labial | round |

`bitfield: 0X`

import re

with open('docs/Exact_Format_Paper.tex', 'r', encoding='utf-8') as f:
    text = f.read()

# Full Title
title = "A Scalable Cloud-Native Framework for On-Demand Municipal Tradesman Matchmaking Using Geospatial Optimization, Bilateral Elo Dynamics, and Two-Factor Physical Authentication"

# Clean comments (only unescaped % are LaTeX comments)
clean = re.sub(r'(?<!\\)%.*', '', text)

# Extract abstract
m_abs = re.search(r'Abstract\s*-\s*(.*?)\}\}', clean, re.DOTALL)
abstract = m_abs.group(1).strip() if m_abs else ""

# Extract keywords
m_kw = re.search(r'Keywords?[\-\—]+\s*(.*?)\}\}', clean, re.DOTALL)
keywords = m_kw.group(1).strip() if m_kw else ""

# Extract main body
m_sec1 = re.search(r'\\textbf\{\\large\s+(?:I\.|1\.)\s+INTRODUCTION\}', clean)
m_ref = re.search(r'\\textbf\{\\large\s+(?:VII\.|7\.)?\s*REFERENCES\}', clean)

sec1_start = m_sec1.start() if m_sec1 else clean.find('INTRODUCTION')
ref_start = m_ref.start() if m_ref else clean.find('REFERENCES')
ref_marker_len = len(m_ref.group(0)) if m_ref else len('REFERENCES')

body = clean[sec1_start:ref_start]
ref_body = clean[ref_start + ref_marker_len:]

def convert_tabular_to_text(match):
    content = match.group(1)
    rows = content.split(r'\\')
    text_rows = []
    for r in rows:
        r = re.sub(r'\\hline', '', r)
        r = re.sub(r'\\rowcolor\[[^\]]*\]\{[^}]*\}', '', r)
        r = re.sub(r'\\textbf\{([^}]+)\}', r'\1', r)
        r = re.sub(r'\\textit\{([^}]+)\}', r'\1', r)
        r = re.sub(r'\\cite\{([^}]+)\}', r'[\1]', r)
        r = r.replace(r'\%', '%').replace('~', ' ')
        cells = [c.strip() for c in r.split('&')]
        clean_cells = [c for c in cells if c]
        if clean_cells:
            text_rows.append('  |  '.join(clean_cells))
    return '\n' + '\n'.join(text_rows) + '\n'

def clean_text(t):
    # Preserve percent symbols first
    t = t.replace(r'\%', '%')
    t = t.replace('``', '"').replace("''", '"')
    t = t.replace('---', ' — ').replace('--', '-')
    t = t.replace('~', ' ').replace(r'\,', ' ')

    # Convert tabular to readable text
    t = re.sub(r'\\begin\{tabular\}\{[^}]*\}(.*?)\\end\{tabular\}', convert_tabular_to_text, t, flags=re.DOTALL)

    # Strip equations, figures, algorithm boxes
    t = re.sub(r'\\begin\{equation\}.*?\\end\{equation\}', '\n[Mathematical Formulation]\n', t, flags=re.DOTALL)
    t = re.sub(r'\\safeincludeimage(\[[^\]]*\])?\{[^}]+\}\{[^}]+\}', '', t)
    t = re.sub(r'\\fbox\{.*?Algorithm 1:.*?\}\}', '\n[Algorithm 1: Intelligent Municipal Matchmaking and Dispatch]\n', t, flags=re.DOTALL)
    
    # Strip formatting tags and environments
    t = re.sub(r'\\(begin|end)\{[^}]+\}', '', t)
    t = re.sub(r'\\textbf\{([^}]+)\}', r'\1', t)
    t = re.sub(r'\\textit\{([^}]+)\}', r'\1', t)
    t = re.sub(r'\\texttt\{([^}]+)\}', r'\1', t)
    t = re.sub(r'\\item', '\n• ', t)
    t = re.sub(r'\\vspace\{[^}]+\}', '', t)
    t = re.sub(r'\\noindent', '', t)
    t = re.sub(r'\\large', '', t)
    t = re.sub(r'\\small', '', t)
    t = re.sub(r'\\rule\{[^}]+\}\{[^}]+\}', '', t)
    t = re.sub(r'\\dimexpr[^\\]+\\relax', '', t)
    t = re.sub(r'\\phantom\{[^}]+\}', '', t)
    t = re.sub(r'\\resizebox\{[^\}]+\}\{[^\}]+\}\{', '', t)
    t = re.sub(r'\\url\{([^}]+)\}', r'\1', t)
    t = re.sub(r'\\cite\{([^}]+)\}', r'[\1]', t)
    t = re.sub(r'\\[a-zA-Z]+', '', t)
    
    # Clean brackets and spacing
    t = t.replace('{', '').replace('}', '')
    t = re.sub(r'\b\d+(\.\d+)?[ecm]m\b', '', t)
    
    lines = [l.strip() for l in t.splitlines()]
    clean_lines = []
    for l in lines:
        if l in ['enumerate', 'itemize', 'center', ''] and (len(clean_lines) > 0 and clean_lines[-1] == ''):
            continue
        if l in ['enumerate', 'itemize', 'center']:
            continue
        clean_lines.append(l)
    res = '\n'.join(clean_lines)
    res = re.sub(r'\n{3,}', '\n\n', res)
    return res.strip()

clean_abstract = clean_text(abstract)
clean_keywords = clean_text(keywords)
clean_body = clean_text(body)
clean_refs = clean_text(ref_body)

final_doc = f"""================================================================================
PLAGIARISM CHECK DOCUMENT (TURNITIN / DRILLBIT / GRAMMARLY READY)
================================================================================

TITLE:
{title}

AUTHORS & AFFILIATION:
1. Mr. S. Satya Kumar (Assistant Professor, Dept. of CSE-AIML, Guide) - satyakumar.151@gmail.com
2. Dr. N. Leelavathy (Vice Principal & Professor, Dept. of CSE) - daa@ggu.edu.in
3. Dr. Shrija Madhu (Professor & HoD, Dept. of Data Science) - shrija@giet.ac.in
4. Moturi Sameera (Dept. of CSE-DS) - sameeramoturi27@gmail.com
5. Savarapu Bhumika (Dept. of CSE-DS) - bhumisavarapu06@gmail.com
6. Matte Sravanthi (Dept. of CSE-DS) - mattesravanthi@gmail.com
Godavari Global University, Rajahmundry, Andhra Pradesh, India

ABSTRACT:
{clean_abstract}

KEYWORDS:
{clean_keywords}

================================================================================
MANUSCRIPT NARRATIVE (SECTIONS 1 TO 6)
================================================================================

{clean_body}

================================================================================
REFERENCES (Standard Turnitin Settings: Excluded from similarity check)
================================================================================

{clean_refs}
"""

with open('docs/Plagiarism_Check_Document.txt', 'w', encoding='utf-8') as f:
    f.write(final_doc)

word_count = len(final_doc.split())
print(f"Success! Generated docs/Plagiarism_Check_Document.txt with {word_count} words.")

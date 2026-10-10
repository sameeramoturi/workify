import re

with open('docs/Exact_Format_Paper.tex', 'r', encoding='utf-8') as f:
    text = f.read()

# Full Title
title = "A Scalable Cloud-Native Framework for On-Demand Municipal Tradesman Matchmaking Using Geospatial Optimization, Bilateral Elo Dynamics, and Two-Factor Physical Authentication"

# Clean comments (only unescaped % are LaTeX comments)
clean = re.sub(r'(?<!\\)%.*', '', text)

# Extract abstract
abs_start = clean.find('Abstract - ')
abs_end = clean.find('}}', abs_start)
abstract = clean[abs_start + len('Abstract - '):abs_end].strip()

# Extract keywords
kw_start = clean.find('Keyword - ')
kw_end = clean.find('}}', kw_start)
keywords = clean[kw_start + len('Keyword - '):kw_end].strip()

# Extract main body
sec1_start = clean.find(r'\textbf{\large 1. INTRODUCTION}')
ref_marker = r'\textbf{\large REFERENCES}'
ref_start = clean.find(ref_marker, sec1_start)

body = clean[sec1_start:ref_start]
ref_body = clean[ref_start + len(ref_marker):]

def clean_text(t):
    # Preserve percent symbols first
    t = t.replace(r'\%', '%')
    t = t.replace('``', '"').replace("''", '"')
    t = t.replace('---', ' — ').replace('--', '-')
    t = t.replace('~', ' ').replace(r'\,', ' ')

    # Strip equations, tables, figures, algorithm boxes
    t = re.sub(r'\\begin\{equation\}.*?\\end\{equation\}', '\n[Mathematical Formulation]\n', t, flags=re.DOTALL)
    t = re.sub(r'\\begin\{tabular\}.*?\\end\{tabular\}', '\n[Table Benchmark Results]\n', t, flags=re.DOTALL)
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
1. Mr. S. Satya Kumar (Assistant Professor, Dept. of CSE-AIML, Guide)
2. Dr. N. Leelavathy (Professor, Dept. of CSE, Dean Academic Affairs)
3. Dr. Shrija Madhu (Professor, Dept. of CSE)
4. Moturi Sameera (Dept. of CSE-DS)
5. Savarapu Bumika (Dept. of CSE-DS)
6. Matte Sravanthi (Dept. of CSE-DS)
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
